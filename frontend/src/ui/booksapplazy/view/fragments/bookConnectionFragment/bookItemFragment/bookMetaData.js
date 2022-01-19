import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import AuthorName from './authorName';

export default ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment bookMetaData2Fragment on Book 
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!" }
            ) {
            year
            author @include (if: $fetchAuthorName) {
                ...authorName2Fragment
            }
            
        }
    `, bookNodeRef);

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
                {book.year}
            </Typography>
            {book.author && <AuthorName authorRef={book.author} />}
        </Stack>
    );      
}