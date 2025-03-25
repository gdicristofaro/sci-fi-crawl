import { VolumeUp, VolumeOff } from "@mui/icons-material"
import { Tooltip, IconButton, Slider } from "@mui/material"
import { useState } from "react";

import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const DEFAULT_VOLUME = 80;
const DEFAULT_MUTE = false;


export default () => {

    let [volState, setVolState] = useState({
        muted: DEFAULT_MUTE,
        volume: DEFAULT_VOLUME
    });

    let handleChange = (event: Event, newValue: number | number[]) => {
        setVolState((prev) => ({ ...prev, volume: (newValue as number) }));;
    }
    return (
        <>
            {
                volState.muted ?
                    (<Tooltip title="Unmute">
                        <IconButton aria-label="unmute" onClick={() => setVolState((prev) => ({ ...prev, muted: false }))}>
                            <VolumeOffIcon />
                        </IconButton>
                    </Tooltip>) :
                    (<Tooltip title="Mute">
                        <IconButton aria-label="mute" onClick={() => setVolState((prev) => ({ ...prev, muted: true }))}>
                            <VolumeUp />
                        </IconButton>
                    </Tooltip>)

            }

            <Slider className="volume-slider" aria-label="Volume" value={volState.volume} onChange={handleChange} />
        </>
    )
}