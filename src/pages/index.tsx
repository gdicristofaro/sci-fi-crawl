import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LinkIcon from '@mui/icons-material/Link';
import Slider from '@mui/material/Slider';
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function Home() {
  let [value, setValue] = useState(0);
  let [open, setOpen] = useState(false);

  let handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  }
  return (
    <div className="main-container">
      <div className="control-panel">

      <div className="volume-panel">
            <IconButton aria-label="volume">
              <VolumeUp />
              {/* <VolumeOffIcon /> */}
            </IconButton>
            <Slider className="volume-slider" aria-label="Volume" value={value} onChange={handleChange} />
          </div>

        <div className="button-panel">
          <IconButton aria-label="settings" onClick={() => setOpen(true)}>
            <SettingsIcon />
          </IconButton>

          <IconButton aria-label="link">            
            <LinkIcon />
          </IconButton>

          <IconButton aria-label="full-screen">
            <FullscreenIcon/>
            {/* <FullscreenExitIcon/> */}
          </IconButton>
        </div>

        <div className="play-pause-panel">
          <IconButton aria-label="replay">
            <ReplayIcon />
          </IconButton>

          <IconButton aria-label="play">
            <PlayArrowIcon />
          </IconButton>
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              setOpen(false);
            },
          },
        }}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="episode"
                name="Episode"
                label="Episode"
                type="text"
                fullWidth
                variant="standard"
              />

            </Grid>
            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                name="Title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="crawl"
                name="Crawl"
                label="Crawl"
                type="text"
                multiline
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid size={12} sx={{
              display: "flex",
              alignContent: "baseline",
              alignItems: "baseline"
            }}>
              <TextField
                autoFocus
                margin="dense"
                id="intro"
                name="Intro"
                label="Intro"
                type="text"
                fullWidth
                multiline
                variant="standard"
              />
              <FormControlLabel sx={{
                display: "inline-block",
                flexShrink: 0,
                flexGrow: 0,
                margin: "auto 3vmin 0 0"
              }} control={<Checkbox defaultChecked />} label="Show Intro" />
            </Grid>

            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="logo"
                name="Logo"
                label="Logo"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="crawl"
                name="Crawl"
                label="Crawl"
                type="text"
                multiline
                fullWidth
                variant="standard"
              />

            </Grid>

            <Grid size={12}>
              <TextField
                autoFocus
                margin="dense"
                id="music"
                name="Music"
                label="Music"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
