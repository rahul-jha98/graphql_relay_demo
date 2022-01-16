import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CommentMetaData from "./commentMetaData";
import BookData from './bookData';
import UserData from './commentUserData';
import DeleteCommentButton from './deleteCommentButton';

export default ({ commentNodeRef, disableDeleteOption }) => {
    const comment = useFragment(graphql`
        fragment commentItemFragment on Comment
            @argumentDefinitions(
                fetchBookDetail: { type: "Boolean!" },
                skipUser: { type: "Boolean!" },
                skipTimestamp: { type: "Boolean!"}
            )
        {
            id
            message
            ...commentMetaDataFragment @arguments(skipTimestamp: $skipTimestamp)

            book @include (if: $fetchBookDetail) {
                ...bookDataFragment
            }

            user @skip (if: $skipUser) {
                ...commentUserDataFragment
            }

            ...deleteCommentButtonFragment
        }
    `, commentNodeRef);

    if (!comment) return null;

    return <Card variant="outlined">
        <CardContent sx={{padding: 1, '&:last-child': { paddingBottom: 1 }}}>

            <Typography gutterBottom variant="body2" component="div">
                {comment.message}
            </Typography>

            {comment.user && <UserData userRef={comment.user} />}

            {comment.book && <BookData bookRef={comment.book} />}

            <CommentMetaData commentNodeRef={comment}/>

            {!disableDeleteOption && <DeleteCommentButton commentRef={comment}/> }
        </CardContent>
    </Card>
}