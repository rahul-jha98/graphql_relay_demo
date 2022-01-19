import LoadingButton from "@mui/lab/LoadingButton";
import { graphql, usePaginationFragment } from "react-relay";
import Typography from "@mui/material/Typography";
import CommentsList from '../commentEdgesFragment';



export default ({ rootRef }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment commentConnectionFragment2Fragment on Query @refetchable(queryName: "CommentsPagintaionQuery2")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}
                user_id: { type: "ID" }
                book_id: { type: "ID" }

                fetchBookDetail: { type: "Boolean", defaultValue: true }
                skipUser: { type: "Boolean", defaultValue: true },
                skipTimestamp: { type: "Boolean", defaultValue: false }
            ) {
            comments(first: $first, after: $after, user_id: $user_id, book_id: $book_id) @connection(key: "PaginatedList2_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment2Fragment @arguments(fetchBookDetail: $fetchBookDetail, skipUser: $skipUser, skipTimestamp: $skipTimestamp)
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
