import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import format from 'date-fns/format';

export default ({ commentNodeRef }) => {
    const comment = useFragment(graphql`
        fragment commentMetaDataFragment on Comment
            @argumentDefinitions(
                skipTimestamp: { type: "Boolean!"}
            )
        {
            timestamp @skip(if: $skipTimestamp)     
        }
    `, commentNodeRef);
    if (!comment.timestamp) {
        return null;
    }
    const formattedTime = format(new Date(parseInt(comment.timestamp)), 'hh:mm aa dd/MM/yy ');

    return (
        <Typography variant="caption" color="text.secondary" textAlign="right" width="100%" display="block">
            {formattedTime}
        </Typography>
    );      
}