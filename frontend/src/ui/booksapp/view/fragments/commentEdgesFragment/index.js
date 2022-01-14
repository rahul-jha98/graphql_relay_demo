import { graphql, useFragment } from "react-relay";
import Stack from "@mui/material/Stack";
import CommentItemFragment from './commentItemFragment';



export default ({ commentConnectionRef }) => {
    const data = useFragment(graphql`
        fragment commentEdgesFragment on CommentConnection
        @argumentDefinitions(
                fetchBookDetail: { type: "Boolean", defaultValue: true }
            ) {
            edges {
                node {
                    id
                    ...commentItemFragment @arguments(fetchBookDetail: $fetchBookDetail)
                }
            }
        }
    `, commentConnectionRef);

    return <>
        <Stack direction="column" spacing={1} marginY={2} marginRight={15}>
            {data.edges?.map((edge) => 
                <CommentItemFragment 
                    commentNodeRef={edge.node} 
                    key={edge.node.id} />
            )}
        </Stack>
    </>
}
