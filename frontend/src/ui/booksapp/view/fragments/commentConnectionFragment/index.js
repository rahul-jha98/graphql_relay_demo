import LoadingButton from "@mui/lab/LoadingButton";
import { graphql, usePaginationFragment } from "react-relay";
import Typography from "@mui/material/Typography";
import CommentsList from '../commentEdgesFragment';



export default ({ rootRef, title }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment commentConnectionFragment on Query @refetchable(queryName: "CommentsPagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}
                user_id: { type: "ID" }
                book_id: { type: "ID" }
                fetchBookDetail: { type: "Boolean", defaultValue: true }
                skipUser: { type: "Boolean", defaultValue: true }
            ) {
            comments(first: $first, after: $after, user_id: $user_id, book_id: $book_id) @connection(key: "PaginatedList_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: $fetchBookDetail, skipUser: $skipUser)
            }
        }
    `, rootRef);

    return <>
        <CommentsList commentConnectionRef={data?.comments} />

        {hasNext && 
            <LoadingButton onClick={() => loadNext(2)} loading={isLoadingNext} variant="outlined">Load More</LoadingButton>
        }
    </>
}
