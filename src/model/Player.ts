const TIME_INTERVAL_MS = 100;

export default class {
    private maxPosition: number;
    private audio: HTMLAudioElement | undefined;


    private positionListener: ((position: number) => void) | undefined;
    private playListener: ((playing: boolean) => void) | undefined;
    private volumeListener: ((volume: number) => void) | undefined;

    private position: number = 0;
    private startPlayTime: number = 0;
    private playing: boolean = false;
    private timeListenerId : NodeJS.Timeout | undefined = undefined;
    
    public constructor(
        audio: HTMLAudioElement | undefined, 
        maxPosition: number, 
        positionListener: ((position: number) => void) | undefined,
        playListener: ((playing: boolean) => void) | undefined,
        volumeListener: ((volume: number) => void) | undefined
    ) {
        this.audio = audio;
        this.maxPosition = maxPosition;
        this.positionListener = positionListener;
        this.playListener = playListener;
        this.volumeListener = volumeListener;
    }

    
    private updateDocPosition() {
        let offset = (this.position / 1000) + "s";
        console.log("offset:", offset);
        document.documentElement.style.setProperty('--offset', offset);
        document.documentElement.style.setProperty('--play-state', this.playing ? 'running' : 'paused');
        
        // let styleEl = document.createElement("style");
        // document.body.appendChild(styleEl);
        // document.body.removeChild(styleEl);
        
        // for (let el of document.getElementsByClassName("scene")) {
        //     window.getComputedStyle(el);
        // }
        
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
        this.volumeListener && this.volumeListener(volumePerc);
    }

    public play() {
        this.playing = true;
        // the calculated start playing time with the position offset considered
        this.startPlayTime = new Date().valueOf() - this.position;
        this.updateInternalPosition();
        this.updateDocPosition();
        this.startTimeListener();
        
    }

    public pause() {
        this.playing = false;
        this.stopTimeListener();
        this.updateInternalPosition();
        this.updateDocPosition();
    }

    public seek(position: number) {
        this.position = position;
        this.startPlayTime = new Date().valueOf() - this.position;
        this.positionListener && this.positionListener(this.position);
        this.updateDocPosition();
    }
    
}