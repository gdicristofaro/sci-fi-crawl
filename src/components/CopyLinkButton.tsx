import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/Link';
import { useState } from "react";
import { Snackbar, Fade, Tooltip } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";



export default () => {
    const [state, setState] = useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        Transition: Fade,
    });

    const handleUrlCopy = () => {
        const text = window.location.href;
        navigator.clipboard.writeText(text);

        setState({
            open: true,
            Transition: Fade,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                slots={{ transition: state.Transition }}
                message="Link Copied"
                key={state.Transition.name}
                autoHideDuration={1200}
            />


            <Tooltip title="Copy Link">
                <IconButton aria-label="link" onClick={() => handleUrlCopy()}>
                    <LinkIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}
