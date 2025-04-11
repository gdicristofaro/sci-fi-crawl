import { ANIMATABLE_CLASS } from "@/components/CrawlContainer";

const TIME_INTERVAL_MS = 500;

export default class {
    private maxPosition: number;
    private audio: HTMLAudioElement | undefined;


    private positionListener: ((position: number) => void) | undefined;
    private playListener: ((playing: boolean) => void) | undefined;

    private position: number = 0;
    private startPlayTime: number = 0;
    private playing: boolean = false;
    private requiresAnimationReset: boolean = false;
    private timeListenerId: NodeJS.Timeout | undefined = undefined;

    public constructor(
        audio: HTMLAudioElement | undefined,
        maxPosition: number,
        positionListener: ((position: number) => void) | undefined,
        playListener: ((playing: boolean) => void) | undefined
    ) {
        this.audio = audio;
        this.maxPosition = maxPosition;
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

    public setAudioPosition(positionMs: number) {
        if (this.audio) {
            this.audio.currentTime = positionMs / 1000;
        } 
    }

    public setAudioPlayback(playing: boolean) {
        if (this.audio) {
            if (playing) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        }
    }

    public play() {
        this.playing = true;
        this.requiresAnimationReset = true;
        // the calculated start playing time with the position offset considered
        this.setAudioPosition(this.position);
        this.startPlayTime = new Date().valueOf() - this.position;
        this.updateInternalPosition();
        this.setAudioPlayback(true);
        this.updateDocPosition();
        this.startTimeListener();

    }

    public pause() {
        this.playing = false;
        this.requiresAnimationReset = true;
        this.stopTimeListener();
        this.setAudioPlayback(false);
        this.updateInternalPosition();
        this.updateDocPosition();
    }

    public seek(position: number) {
        this.position = position;
        this.setAudioPosition(this.position);
        this.startPlayTime = new Date().valueOf() - this.position;
        this.positionListener && this.positionListener(this.position);
        this.updateDocPosition();
    }

}