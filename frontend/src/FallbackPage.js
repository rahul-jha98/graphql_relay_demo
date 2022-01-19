import ErrorLogo from './svgs/Error.svg';
import LoadingLogo from './svgs/Connecting.svg';
import { Typography, Box, Stack } from "@mui/material"

export default ({ isErrorMode } = { isErrorMode: false }) => {
    const image = isErrorMode ? ErrorLogo : LoadingLogo;
    const message = isErrorMode ? "Something went wrong" : "Loading ...";
    const height = isErrorMode ? "120px" : "160px";
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Stack direction="column" spacing={3} margin={5}>
                <img src={image} height={height}/>
                <Typography>{message}</Typography>
            </Stack>
        </Box>
    );

}