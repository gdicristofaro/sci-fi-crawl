import { VolumeUp, VolumeOff } from "@mui/icons-material"
import { Tooltip, IconButton, Slider } from "@mui/material"
import { useState } from "react";

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TooltipVis from "./TooltipVis";

const DEFAULT_MUTE = false;


export default (props: {visible: boolean, initialVolume: number, setter: (newVolume: number) => void}) => {
    let {visible, initialVolume, setter} = props;
    let [volState, setVolState] = useState({
        muted: DEFAULT_MUTE,
        volume: initialVolume
    });

    let handleSliderChange = (event: Event, newValue: number | number[]) => {
        setter(newValue as number);
        setVolState((prev) => ({ ...prev, volume: (newValue as number) }));;
    }

    let handleMuteChange = (muted: boolean) => {
        setter(muted ? 0 : volState.volume);
        setVolState((prev) => ({ ...prev, muted}));
    }


    return (
        <>
            {
                volState.muted ?
                    (<TooltipVis title="Unmute" visible={visible}>
                        <IconButton aria-label="unmute" onClick={() => handleMuteChange(false)}>
                            <VolumeOffIcon />
                        </IconButton>
                    </TooltipVis>) :
                    (<TooltipVis title="Mute" visible={visible}>
                        <IconButton aria-label="mute" onClick={() => handleMuteChange(true)}>
                            <VolumeUp />
                        </IconButton>
                    </TooltipVis>)

            }

            <Slider className="volume-slider" aria-label="Volume" value={volState.volume} step={.05} min={0} max={1} onChange={handleSliderChange} disabled={volState.muted} />
        </>
    )
}