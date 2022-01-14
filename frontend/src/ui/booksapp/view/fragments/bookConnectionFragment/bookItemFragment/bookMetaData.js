import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import AuthorName from './authorName';

export default ({ bookNodeRef, showAuthorName }) => {
    const book = useFragment(graphql`
        fragment bookMetaDataFragment on Book 
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!" }
            ) {
            year
            author @include (if: $fetchAuthorName) {
                ...authorNameFragment
            }
            
        }
    `, bookNodeRef);

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
                {book.year}
            </Typography>
            {showAuthorName && <AuthorName authorRef={book.author} />}
        </Stack>
    );      
}