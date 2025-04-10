import { VolumeUp, VolumeOff } from "@mui/icons-material"
import { Tooltip, IconButton, Slider } from "@mui/material"
import { useState } from "react";

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TooltipVis from "./TooltipVis";

const DEFAULT_VOLUME = 80;
const DEFAULT_MUTE = false;


export default (props: {visible: boolean}) => {

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
                    (<TooltipVis title="Unmute" visible={props.visible}>
                        <IconButton aria-label="unmute" onClick={() => setVolState((prev) => ({ ...prev, muted: false }))}>
                            <VolumeOffIcon />
                        </IconButton>
                    </TooltipVis>) :
                    (<TooltipVis title="Mute" visible={props.visible}>
                        <IconButton aria-label="mute" onClick={() => setVolState((prev) => ({ ...prev, muted: true }))}>
                            <VolumeUp />
                        </IconButton>
                    </TooltipVis>)

            }

            <Slider className="volume-slider" aria-label="Volume" value={volState.volume} onChange={handleChange} />
        </>
    )
}