import { Tooltip } from "@mui/material";

export default (props: { title: string, visible: boolean, children: any}) => {
  let {title, visible, children} = props;

  let tooltipProps = {title, classes: visible ? undefined : {popper: "invisible"}}
  return (<Tooltip {...tooltipProps}>
        {children}
    </Tooltip>);
}