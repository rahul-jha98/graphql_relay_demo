import LoadingButton from "@mui/lab/LoadingButton";
import { graphql, usePaginationFragment } from "react-relay";
import Typography from "@mui/material/Typography";
import CommentsList from '../../fragments/commentEdgesFragment';



export default ({ bookNodeRef }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment bookcomments2ConnectionFragment on Book @refetchable(queryName: "BookComments2PagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}
            ) {
            comments(first: $first, after: $after) @connection(key: "Book2_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment2Fragment @arguments(fetchBookDetail: false, skipUser: false, skipTimestamp: false)
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
