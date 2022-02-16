import LoadingButton from "@mui/lab/LoadingButton";
import { graphql, usePaginationFragment } from "react-relay";
import Typography from "@mui/material/Typography";
import CommentsList from '../../fragments/commentEdgesFragment';



export default ({ bookNodeRef }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment bookcommentsConnectionFragment on Book @refetchable(queryName: "BookCommentsPagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}

                fetchBookDetail: { type: "Boolean", defaultValue: true }
                skipUser: { type: "Boolean", defaultValue: true },
                skipTimestamp: { type: "Boolean", defaultValue: false }
            ) {
            comments(first: $first, after: $after) @connection(key: "Book_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: $fetchBookDetail, skipUser: $skipUser, skipTimestamp: $skipTimestamp)
            }
        }
    `, bookNodeRef);

    return <>
        <CommentsList commentConnectionRef={data?.comments} />

        {hasNext && 
            <LoadingButton onClick={() => loadNext(2)} loading={isLoadingNext} variant="outlined">Load More</LoadingButton>
        }
    </>
}
