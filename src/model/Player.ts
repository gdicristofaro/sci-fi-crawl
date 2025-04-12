import { ANIMATABLE_CLASS } from "@/components/CrawlContainer";

const TIME_INTERVAL_MS = 200;

export default class {
    private maxPosition: number;
    private audio: HTMLAudioElement | undefined;


    private positionListener: ((position: number) => void) | undefined;
    private playListener: ((playing: boolean) => void) | undefined;

    private position: number = 0;
    private startPlayTime: number = 0;
    private musicOffsetMs: number = 0;
    private playing: boolean = false;
    private requiresAnimationReset: boolean = false;
    private timeListenerId: NodeJS.Timeout | undefined = undefined;

    public constructor(
        audio: HTMLAudioElement | undefined,
        musicOffsetMs: number,
        maxPosition: number,
        positionListener: ((position: number) => void) | undefined,
        playListener: ((playing: boolean) => void) | undefined
    ) {
        this.audio = audio;
        this.maxPosition = maxPosition;
        this.musicOffsetMs = musicOffsetMs;
        this.positionListener = positionListener;
        this.playListener = playListener;
    }


    // taken from https://stackoverflow.com/a/45036752 to reset animation
    private resetAnimation(el: any) {
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.clientLeft;
        el.style.animation = null;
    }

    private updateDocPosition() {
        let offset = (this.position / 1000) + "s";
        // console.log("offset:", offset);
        document.documentElement.style.setProperty('--offset', offset);
        document.documentElement.style.setProperty('--play-state', this.playing ? 'running' : 'paused');

        if (this.playing || this.requiresAnimationReset) {
            for (let animatable of document.getElementsByClassName(ANIMATABLE_CLASS)) {
                this.resetAnimation(animatable);
            }

            if (!this.playing)
            this.requiresAnimationReset = false;
        }

        // TODO handle audio playing
    }

    /**
     * This is called when the document updates outside of this class having knowledge.
     */
    private updateInternalPosition() {
        this.position = Math.min(new Date().valueOf() - this.startPlayTime, this.maxPosition);
        if (this.position >= this.maxPosition && this.playing) {
            this.pause();
        } else {
            this.checkSetAudioPosition(false);
            this.positionListener && this.positionListener(this.position);
            this.playListener && this.playListener(this.playing);
        }

    }

    private startTimeListener() {
        this.timeListenerId = setInterval(() => {
            this.playing && this.updateInternalPosition();
        }, TIME_INTERVAL_MS);
    }

    private stopTimeListener() {
        if (this.timeListenerId) {
            clearInterval(this.timeListenerId);
            this.timeListenerId = undefined;
        }
    }

    public setVolume(volumePerc: number) {
        if (this.audio && !this.audio.paused) {
            this.audio.volume = volumePerc;
        }
    }

    public getAudioOffSet(positionMs: number): number {
        return (positionMs - this.musicOffsetMs) / 1000;
    }

    public checkSetAudioPosition(forceUpdate: boolean) {
        if (this.audio && this.playing && (this.audio.paused || forceUpdate)) {
            let audioOffset = this.getAudioOffSet(this.position);
            if (audioOffset >= 0) {
                this.audio.currentTime = audioOffset;
                this.audio.play();
            } else if (forceUpdate) {
                this.audio.pause();
            }
        }
    }

    public stopAudio() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    public play() {
        this.playing = true;
        this.requiresAnimationReset = true;
        // the calculated start playing time with the position offset considered
        this.startPlayTime = new Date().valueOf() - this.position;
        this.updateInternalPosition();
        this.updateDocPosition();
        this.checkSetAudioPosition(true);
        this.startTimeListener();

    }

    public pause() {
        this.playing = false;
        this.requiresAnimationReset = true;
        this.stopTimeListener();
        this.stopAudio();
        this.updateInternalPosition();
        this.updateDocPosition();
    }

    public seek(position: number) {
        this.position = position;
        this.checkSetAudioPosition(true);
        this.startPlayTime = new Date().valueOf() - this.position;
        this.positionListener && this.positionListener(this.position);
        this.updateDocPosition();
    }

}