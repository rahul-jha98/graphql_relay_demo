import { graphql, useFragment } from "react-relay";
import Stack from "@mui/material/Stack";
import CommentItemFragment from './commentItemFragment';
import Typography from "@mui/material/Typography";


export default ({ commentConnectionRef, disableDeleteOption = false }) => {
    const data = useFragment(graphql`
        fragment commentEdgesFragment2Fragment on CommentConnection
        @argumentDefinitions(
                fetchBookDetail: { type: "Boolean", defaultValue: true },
                skipUser: { type: "Boolean", defaultValue: true },
                skipTimestamp: { type: "Boolean", defaultValue: false }
            ) {
            edges {
                node {
                    id
                    ...commentItemFragment2Fragment @arguments(fetchBookDetail: $fetchBookDetail, skipUser: $skipUser, skipTimestamp: $skipTimestamp)
                }
            }
        }
    `, commentConnectionRef);

    return <>
        {data.edges?.length ? 
            <Stack direction="column" spacing={1} marginY={2} marginRight={15}>
                {data.edges?.map((edge) => 
                    <CommentItemFragment 
                        key={edge.node?.id} 
                        commentNodeRef={edge.node} 
                        disableDeleteOption={disableDeleteOption}/>
                )}
            </Stack> :
            <Typography variant="body2" color="text.secondary"> - </Typography>}
    </>
}
