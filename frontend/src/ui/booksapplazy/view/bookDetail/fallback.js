import { Typography, Skeleton } from "@mui/material";

export default ({ propsArray }) => propsArray.map((props, idx) => <Typography {...props} key={idx}><Skeleton /></Typography>);
