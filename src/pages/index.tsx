import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, Tooltip } from "@mui/material";

import CopyLinkButton from "@/components/CopyLinkButton";
import FullScreenButton from "@/components/FullScreenButton";
import SettingsButton from "@/components/SettingsButton";
import VolumePanel from "@/components/VolumePanel";
import CrawlContainer from "@/components/CrawlContainer";
import { getData } from "@/utils/requestutils";
import CrawlSettings from "@/dto/CrawlSettings";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function Home() {
  let [playStatus, setPlayStatus] = useState({
    playing: false,
    position: 0,
    showPanel: false
  });

  let [requestParams, setRequestParams] = useState<CrawlSettings | undefined>();
  useEffect(() => {
    setRequestParams(getData());
  }, [])


  let handleChange = (event: Event, newValue: number | number[]) => {
    setPlayStatus((prev) => ({ ...prev, position: newValue as number }));
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="main-container">
        <CrawlContainer {...requestParams} />

        <div className={"control-panel" + (playStatus.showPanel ? " show" : "")} onClick={() => setPlayStatus((prev) => ({...prev, showPanel: !prev.showPanel}))}>
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
              <IconButton aria-label="replay">
                <ReplayIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Play">
              <IconButton aria-label="play">
                <PlayArrowIcon />
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
            <Slider aria-label="Play Position" value={playStatus.position} onChange={handleChange} />
          </div>
        </div>


      </div>
    </ThemeProvider>
  );
}
