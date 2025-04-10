import { Tooltip } from "@mui/material";

export default (props: { title: string, visible: boolean, children: any}) => {
  let {title, visible, children} = props;
  return visible ?
    (<Tooltip title={title}>
        {children}
    </Tooltip>) :
    (children);
}