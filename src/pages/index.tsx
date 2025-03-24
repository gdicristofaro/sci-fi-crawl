import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LinkIcon from '@mui/icons-material/Link';
import Slider from '@mui/material/Slider';
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel, Snackbar, Fade, Tooltip } from "@mui/material";

import SkipNextIcon from '@mui/icons-material/SkipNext';
import Alert from '@mui/material/Alert';
import { TransitionProps } from "@mui/material/transitions";
import CopyLinkButton from "@/components/CopyLinkButton";
import FullScreenButton from "@/components/FullScreenButton";
import SettingsButton from "@/components/SettingsButton";



export default function Home() {
  let [value, setValue] = useState(0);


  let handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  }
  return (
    <div className="main-container">

      <div className="control-panel">

        <div className="volume-panel">
          <Tooltip title="Mute">
            <IconButton aria-label="volume">
              <VolumeUp />
              {/* <VolumeOffIcon /> */}
            </IconButton>
            </Tooltip>

            <Slider className="volume-slider" aria-label="Volume" value={value} onChange={handleChange} />
          
        </div>

        <div className="button-panel">
          <SettingsButton/>
          <CopyLinkButton/>
          <FullScreenButton/>
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
          </IconButton> */}

          <div></div>
        </div>

        <div className="seeking-panel">
          <Slider aria-label="Volume" value={value} onChange={handleChange} />
        </div>
      </div>


    </div>
  );
}
