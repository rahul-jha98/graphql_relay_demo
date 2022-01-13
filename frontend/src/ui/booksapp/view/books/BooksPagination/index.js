import { Button } from "@mui/material";
import { graphql, usePaginationFragment } from "react-relay";
import BooksConnectionFragment from "../../fragments/booksConnectionFragment";

export default ({ rootRef }) => {
    const {data, hasNext, loadNext, isLoadingNext} = usePaginationFragment(graphql`
        fragment BooksPaginationFragment on Query @refetchable(queryName: "BooksPagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 2 }
                after: { type: "String"}
            ) {
            books(first: $first, after: $after) @connection(key: "AllBooksList_books") {
                edges {
                    cursor
                }
                ...booksConnectionFragment @arguments(fetchAuthorName: true)
            }
        }
    `, rootRef);

    return <>
        <BooksConnectionFragment bookConnectionRef={data.books} showAuthorName={true} />
        {hasNext && 
            <Button onClick={() => loadNext(2)} disabled={isLoadingNext}>Load More</Button>
        }
    </>
}