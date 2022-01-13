import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment bookMetaDataFragment on Book {
            year
            isbn
        }
    `, bookNodeRef);

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
                {book.isbn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                - {book.year}
            </Typography>
        </Stack>
    );      
}