import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import Slider from '@mui/material/Slider';
import { useEffect, useState, useMemo } from "react";
import { createTheme, ThemeProvider, Tooltip } from "@mui/material";

import CopyLinkButton from "@/components/CopyLinkButton";
import FullScreenButton from "@/components/FullScreenButton";
import SettingsButton from "@/components/SettingsButton";
import VolumePanel from "@/components/VolumePanel";
import CrawlContainer from "@/components/CrawlContainer";
import { getData } from "@/utils/requestutils";
import CrawlSettings from "@/model/CrawlSettings";
import Player from "@/model/Player";


const MAX_MILLIS = 180 * 1000;
const SEC_RESOLUTION = 4;

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
    startPlayTime: 0,
    showPanel: true
  });

  // useEffect(() => {
  //   if (playStatus.playing) {
  //     let funct = () => {
  //       setPlayStatus((prev) => ({ ...prev, position: (new Date().valueOf() - prev.startPlayTime) / (1000 / SEC_RESOLUTION) }));
  //     };


  //     let intervalId = setInterval(funct, (1000 / SEC_RESOLUTION));

  //     return () => clearInterval(intervalId);
  //   };
  // }, [playStatus.playing, playStatus.startPlayTime]);


  let requestParams = getData();

  let player = useMemo(() => new Player(
    undefined, 
    MAX_MILLIS, 
    position => setPlayStatus(prev => ({ ...prev, position: position / 1000 * SEC_RESOLUTION})),
    playing => setPlayStatus(prev => ({...prev, playing})),
    volume => console.log("volume: " + volume)
  ), []);


  let setPosition = (position: number) => {
    player.seek(position);
  }

  let handleChange = (event: Event, newValue: number | number[]) => {
    setPosition(newValue as number);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="main-container">
        <CrawlContainer {...requestParams} />

        <div
          id="control-panel"
          className={"control-panel" + (playStatus.showPanel ? "" : " hide")}
          onClick={(e) => {
            if ((e.target as any).id === "control-panel") {
              setPlayStatus((prev) => ({ ...prev, showPanel: !prev.showPanel }));
            }
          }}>
          <div className="volume-panel">
            <VolumePanel />
          </div>

          <div className="button-panel">
            <SettingsButton {...requestParams} />
            <CopyLinkButton />
            <FullScreenButton />
          </div>

          <div className="play-pause-panel">
            <Tooltip title="Replay">
              <IconButton
                aria-label="replay"
                onClick={() => setPosition(0)}
                disabled={playStatus.position <= 0}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={playStatus.playing ? "Pause" : "Play"}>
              <IconButton aria-label="play" onClick={() => {
                if (playStatus.playing) {
                  player.pause();
                } else {
                  player.play();
                }
              }}>
                {playStatus.playing ? (<PauseIcon />) : (<PlayArrowIcon />)}
              </IconButton>
            </Tooltip>
            {/* 
          <IconButton aria-label="skip-intro">
            <SkipNextIcon />
          </IconButton> 
          */}
            <div></div>

          </div>

          <div className="seeking-panel">
            <Slider aria-label="Play Position" value={playStatus.position} min={0} max={MAX_MILLIS / 1000 * SEC_RESOLUTION} onChange={handleChange} />
          </div>
        </div>


      </div>
    </ThemeProvider>
  );
}

