import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import format from 'date-fns/format';

export default ({ commentNodeRef }) => {
    const comment = useFragment(graphql`
        fragment commentMetaDataFragment on Comment
        {
            timestamp            
        }
    `, commentNodeRef);

    const formattedTime = format(new Date(parseInt(comment.timestamp)), 'hh:mm aa dd/MM/yy ');

    return (
        <Typography variant="caption" color="text.secondary" sx={{float: 'right'}}>
            {formattedTime}
        </Typography>
    );      
}