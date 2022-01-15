import { graphql, useFragment } from "react-relay";
import CommentsList from '../../fragments/commentEdgesFragment';

export default ({ bookNodeRef }) => {
    const data = useFragment(graphql`
        fragment commentsForBookFragment on Book
        {
            comments(first: 3) @connection(key: "PaginatedListCommentsForBook_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: false)
                pageInfo {
                    hasNextPage
                }
            }
        }
    `, bookNodeRef);

    return <CommentsList commentConnectionRef={data?.comments} />
}