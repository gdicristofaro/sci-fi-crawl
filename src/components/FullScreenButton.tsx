import { Tooltip, IconButton } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useEffect, useState } from "react";
import TooltipVis from "./TooltipVis";

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}


export default (props: {visible: boolean}) => {
    let [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        let listener = () => setFullScreen(document.fullscreenElement ? true : false);
        document.addEventListener("fullscreenchange", listener);

        return () => {
            document.removeEventListener("fullscreenchange", listener);
        }
    }, [])

    return (
        <TooltipVis title="Full Screen" visible={props.visible}>
            {
                fullScreen ?
                    (<IconButton aria-label="exit-full-screen" onClick={() => {
                        try {
                            document.exitFullscreen();
                        } catch (e) {
                            console.error(e);
                        }
                    }}>
                        <FullscreenExitIcon />
                    </IconButton>) :
                    (
                        <IconButton aria-label="full-screen" onClick={() => {
                            try {
                                document.documentElement.requestFullscreen();
                            } catch (e) {
                                console.error(e);
                            }
                        }}>
                            <FullscreenIcon />
                        </IconButton>
                    )
            }

        </TooltipVis>);
}