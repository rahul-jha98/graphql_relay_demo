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
            minHeight="100vh"
        >
            <Stack direction="row" spacing={10} margin={5}>
                <Link to="/suspensedemo" style={{ textDecoration: 'none' }}>
                    <Button color="secondary" variant="outlined">Suspense Demo</Button>
                </Link>

                <Link to="/querydemo" style={{ textDecoration: 'none' }}>
                    <Button color="secondary" variant="outlined">Data Fetching Pattern Demo</Button>
                </Link>

                <Link to="/bookapp" style={{ textDecoration: 'none' }}>
                    <Button color="secondary" variant="outlined">Book App</Button>
                </Link>

                <Link to="/bookapplazy" style={{ textDecoration: 'none' }}>
                    <Button color="secondary" variant="outlined">Book App - Fetch on Render</Button>
                </Link>
            </Stack>
            
        </Box>
    )
}