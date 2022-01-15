import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CommentMetaData from "./commentMetaData";
import BookData from './bookData';
import UserData from './commentUserData';

export default ({ commentNodeRef }) => {
    const comment = useFragment(graphql`
        fragment commentItemFragment on Comment
            @argumentDefinitions(
                fetchBookDetail: { type: "Boolean!" },
                skipUser: { type: "Boolean!" }
            )
        {
            id
            message
            ...commentMetaDataFragment
            book @include (if: $fetchBookDetail) {
                ...bookDataFragment
            }
            user @skip (if: $skipUser) {
                ...commentUserDataFragment
            }
        }
    `, commentNodeRef);

    return <Card variant="outlined">
        <CardContent sx={{padding: 1, '&:last-child': { paddingBottom: 1 }}}>
            <Typography gutterBottom variant="body2" component="div">
                {comment.message}
            </Typography>
            {comment.book && <BookData bookRef={comment.book} />}
            {comment.user && <UserData userRef={comment.user} />}
            <CommentMetaData commentNodeRef={comment}/>
        </CardContent>
    </Card>
}