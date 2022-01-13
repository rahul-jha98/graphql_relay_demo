import { Button } from "@mui/material";
import { graphql, usePaginationFragment } from "react-relay";
import Stack from "@mui/material/Stack";
import BookItemFragment from '../bookItemFragment';



export default ({ rootRef, showAuthorName }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment bookConnectionFragment on Query @refetchable(queryName: "BooksPagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}
                author_id: { type: "ID" }
                fetchAuthorName: { type: "Boolean", defaultValue: true }
            ) {
            books(first: $first, after: $after, author_id: $author_id) @connection(key: "PaginatedList_books") {
                edges {
                    node {
                        id
                        ...bookItemFragment @arguments(fetchAuthorName: $fetchAuthorName)
                    }
                }
            }
        }
    `, rootRef);

    return <>
        <Stack direction="column" spacing={1} margin={2} marginRight={15}>
            {data.books?.edges?.map((edge) => 
                <BookItemFragment 
                    bookNodeRef={edge.node} 
                    key={edge.node.id} 
                    showAuthorName={showAuthorName}/>
            )}
        </Stack>

        {hasNext && 
            <Button onClick={() => loadNext(2)} disabled={isLoadingNext}>Load More</Button>
        }
    </>
}
