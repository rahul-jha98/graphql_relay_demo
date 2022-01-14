import { graphql, useFragment } from "react-relay";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

export default ({ user }) => {
    const data = useFragment(graphql`
        fragment profiledetailsFragment on User {
            __typename
            id
            name
        }
    `, user);

    return <Stack direction="column" marginY={2} marginBottom={5}>
        <Typography variant="body2" color="text.secondary">
            {data.id}
        </Typography>
        <Typography variant="h6" >
            {data.name}
        </Typography>
        <Typography variant="body2">
            Type: {data.__typename}
        </Typography>
    </Stack>
}