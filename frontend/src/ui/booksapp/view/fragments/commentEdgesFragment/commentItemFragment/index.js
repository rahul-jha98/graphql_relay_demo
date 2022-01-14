import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CommentMetaData from "./commentMetaData";

export default ({ commentNodeRef, showBookName }) => {
    const comment = useFragment(graphql`
        fragment commentItemFragment on Comment
            @argumentDefinitions(
                fetchBookDetail: { type: "Boolean!" }
            )
        {
            id
            message
            ...commentMetaDataFragment @arguments(fetchBookDetail: $fetchBookDetail)
        }
    `, commentNodeRef);

    return <Card variant="outlined">
        <CardContent sx={{padding: 1, '&:last-child': { paddingBottom: 1 }}}>
            <Typography gutterBottom variant="body2" component="div">
                {comment.message}
            </Typography>
            <CommentMetaData commentNodeRef={comment} showBookName={showBookName} />
        </CardContent>
    </Card>
}