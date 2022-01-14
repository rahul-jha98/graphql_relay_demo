import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import format from 'date-fns/format';

export default ({ commentNodeRef, showBookName }) => {
    const comment = useFragment(graphql`
        fragment commentMetaDataFragment on Comment
            @argumentDefinitions(
                fetchBookDetail: { type: "Boolean!" }
            ) {
            timestamp
            book @include (if: $fetchBookDetail) {
                name
            }
            
        }
    `, commentNodeRef);

    const formattedTime = format(new Date(parseInt(comment.timestamp)), 'dd/MM/yy hh:mm aa');

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary">
                {formattedTime}
            </Typography>
            {/* {showBookName && <AuthorName authorRef={book.author} />} */}
        </Stack>
    );      
}