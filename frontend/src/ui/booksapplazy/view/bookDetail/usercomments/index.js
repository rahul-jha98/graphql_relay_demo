import { graphql, useFragment } from "react-relay";
import CommentsList from '../../fragments/commentEdgesFragment';
import Typography from "@mui/material/Typography";
import AddCommentOption from './addCommentOption';

export default ({ bookNodeRef }) => {
    const data = useFragment(graphql`
        fragment usercommentsForBook2Fragment on Book
        @argumentDefinitions(
                user_id: { type: "ID" }
            )
        {
            comments(user_id: $user_id, first: 1) @connection(key: "BookCommentsFromUser2_comments"){
                __id
                edges {
                    cursor
                }
                ...commentEdgesFragment2Fragment @arguments(fetchBookDetail: false)
            }
            id
        }
    `, bookNodeRef);

    if (!data) return null;
    
    if (data?.comments?.edges?.every((edge) => edge.node === null)) {
        return <AddCommentOption userCommentConnectionId={data?.comments?.__id} bookId={data.id} />
    }
    return <>
        <Typography variant='body1' marginTop={4}>
            Your Comment
        </Typography>
        <CommentsList commentConnectionRef={data?.comments} />
    </>
}