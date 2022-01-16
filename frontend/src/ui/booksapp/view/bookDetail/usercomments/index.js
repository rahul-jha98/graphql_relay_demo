import { graphql, useFragment } from "react-relay";
import CommentsList from '../../fragments/commentEdgesFragment';
import Typography from "@mui/material/Typography";
import AddCommentOption from './addCommentOption';

export default ({ bookNodeRef }) => {
    const data = useFragment(graphql`
        fragment usercommentsForBookFragment on Book
        @argumentDefinitions(
                user_id: { type: "ID" }
            )
        {
            comments(user_id: $user_id, first: 1) @connection(key: "BookCommentsFromUser_comments"){
                __id
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: false)
            }
            id
        }
    `, bookNodeRef);

    return <>
        {data?.comments?.edges?.length ? 
            <>
                <Typography variant='body1' marginTop={4}>
                    Your Comment
                </Typography>
                <CommentsList commentConnectionRef={data?.comments} />
            </> :
            <AddCommentOption userCommentConnectionId={data?.comments?.__id} bookId={data.id} />
        }
     </>

}