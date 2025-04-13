import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReplayIcon from '@mui/icons-material/Replay';
import Slider from '@mui/material/Slider';
import { useEffect, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import CopyLinkButton from "@/components/CopyLinkButton";
import FullScreenButton from "@/components/FullScreenButton";
import SettingsButton from "@/components/SettingsButton";
import VolumePanel from "@/components/VolumePanel";
import CrawlContainer from "@/components/CrawlContainer";
import { getData } from "@/utils/requestutils";
import CrawlSettings, { DEFAULT_CRAWL_SETTINGS } from "@/model/CrawlSettings";
import Player from "@/model/Player";
import TooltipVis from "@/components/TooltipVis";


const MAX_MILLIS = 100 * 1000;
const SEC_RESOLUTION = 4;
const INTRO_END_MS = 8000;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted && (<Home />);
}


const Home = () => {
  let [playStatus, setPlayStatus] = useState({
    playing: false,
    position: 0,
    showPanel: true
  });

  let requestParams = useMemo(() => getData(), [window.location.search]);

  let inferredParams: CrawlSettings = {...DEFAULT_CRAWL_SETTINGS, ...requestParams};

  let player = useMemo(() => new Player(
    inferredParams?.music ? new Audio(inferredParams.music) : undefined, 
    (inferredParams?.musicOffset ?? 0) * 1000, // convert seconds to milliseconds
    MAX_MILLIS, 
    position => setPlayStatus(prev => ({ ...prev, position})),
    playing => setPlayStatus(prev => ({...prev, playing}))
  ), []);


  let setPosition = (position: number) => {
    player.seek(position);
  }

  let handleSeek = (event: Event, increment: number | number[]) => {
    setPosition(((increment as number) * 1000) / SEC_RESOLUTION);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="main-container">
        <CrawlContainer {...inferredParams} />

        <div
          id="control-panel"
          className={"control-panel" + (playStatus.showPanel ? "" : " hide")}
          onClick={(e) => {
            if ((e.target as any).id === "control-panel") {
              setPlayStatus((prev) => ({ ...prev, showPanel: !prev.showPanel }));
            }
          }}>
          <div className="volume-panel">
            <VolumePanel visible={playStatus.showPanel} initialVolume={1} setter={(vol) => player.setVolume(vol)}/>
          </div>

          <div className="button-panel">
            <SettingsButton {...{...requestParams, visible: playStatus.showPanel}} />
            <CopyLinkButton />
            <FullScreenButton visible={playStatus.showPanel}/>
          </div>

          <div className="play-pause-panel">
            <TooltipVis title="Replay" visible={playStatus.showPanel}>
              <IconButton
                aria-label="replay"
                onClick={() => {
                  setPosition(0);
                  if (playStatus.playing) {
                    setPlayStatus((prev) => ({...prev, showPanel: false}))
                  }
                }}
                disabled={playStatus.position <= 0}>
                <ReplayIcon />
              </IconButton>
            </TooltipVis>

            <TooltipVis title={playStatus.playing ? "Pause" : "Play"} visible={playStatus.showPanel}>
              <IconButton aria-label="play" onClick={() => {
                if (playStatus.playing) {
                  player.pause();
                } else {
                  player.play();
                  setPlayStatus((prev) => ({...prev, showPanel: false}))
                }
              }}>
                {playStatus.playing ? (<PauseIcon />) : (<PlayArrowIcon />)}
              </IconButton>
            </TooltipVis>

            <TooltipVis title="Skip Intro" visible={playStatus.showPanel}>
              <IconButton aria-label="skip-intro" onClick={() => {
                setPosition(INTRO_END_MS);
                if (playStatus.playing) {
                  setPlayStatus((prev) => ({...prev, showPanel: false}))
                }
              }}>
                <SkipNextIcon />
              </IconButton>
            </TooltipVis>
         
            {/* <div></div> */}

          </div>

          <div className="seeking-panel">
            <Slider aria-label="Play Position" value={playStatus.position / 1000 * SEC_RESOLUTION} min={0} max={MAX_MILLIS / 1000 * SEC_RESOLUTION} onChange={handleSeek} />
          </div>
        </div>


      </div>
    </ThemeProvider>
  );
}

