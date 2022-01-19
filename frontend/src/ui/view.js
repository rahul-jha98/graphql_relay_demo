import { Button, Box, Stack } from "@mui/material"
import {
    Link,
    NavLink
  } from "react-router-dom";

export default () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Stack direction="column" spacing={10} marginTop={10} alignItems="center">

                <Link to="/bookapp" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" classes={{}}>Book App - Fetch with Render</Button>
                </Link>

                <Link to="/bookapplazy" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined">Book App - Fetch on Render</Button>
                </Link>

                <Stack direction="row" spacing={10}>
                    <Link to="/suspensedemo" style={{ textDecoration: 'none' }}>
                        <Button variant="text">Suspense Demo</Button>
                    </Link>

                    <Link to="/querydemo" style={{ textDecoration: 'none' }}>
                        <Button  variant="text">Data Fetching Pattern Demo</Button>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    )
}