import Stack from "@mui/material/Stack";
import { graphql, useFragment } from "react-relay";
import BookItemFragment from '../bookItemFragment';

export default ({ bookConnectionRef, showAuthorName }) => {
    const data = useFragment(graphql`
        fragment booksConnectionFragment on BookConnection
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!", defaultValue: true }
            ) {
           edges {
               node {
                   id
                   ...bookItemFragment @arguments(fetchAuthorName: $fetchAuthorName)
               }
           }
        }
    `, bookConnectionRef);

    return (
        <Stack direction="column" spacing={1} margin={2} marginRight={15}>
            {data.edges?.map((edge) => 
                <BookItemFragment 
                    bookNodeRef={edge.node} 
                    key={edge.node.id} 
                    showAuthorName={showAuthorName}/>
            )}
        </Stack>
    );  
}