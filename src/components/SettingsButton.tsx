import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Grid2';
import SettingsIcon from '@mui/icons-material/Settings';

export default () => {
    let [settingsOpen, setSettingsOpen] = useState(false);
    return (
        <>
            <Tooltip title="Settings">
                <IconButton aria-label="settings" onClick={() => setSettingsOpen(true)}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const email = formJson.email;
                            console.log(email);
                            setSettingsOpen(false);
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
                    <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
                    <Button>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}