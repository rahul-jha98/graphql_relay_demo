import LoadingButton from "@mui/lab/LoadingButton";
import { graphql, usePaginationFragment } from "react-relay";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BookItemFragment from './bookItemFragment';
import Typography from "@mui/material/Typography";
import CachedIcon from '@mui/icons-material/Cached';
import { useState } from "react";

export default ({ rootRef, title, showButtonForComments }) => {
    const {data, hasNext, loadNext, isLoadingNext, refetch} = usePaginationFragment(graphql`
        fragment bookConnectionFragment on Query @refetchable(queryName: "BooksPagintaionQuery")
        @argumentDefinitions(
                first: { type: "Int", defaultValue: 4 }
                after: { type: "String"}
                author_id: { type: "ID" }
                fetchAuthorName: { type: "Boolean", defaultValue: true },
                includeRecentComments: { type: "Boolean", defaultValue: false }
            ) {
            books(first: $first, after: $after, author_id: $author_id) @connection(key: "PaginatedList_books") {
                edges {
                    node {
                        id
                        ...bookItemFragment @arguments(fetchAuthorName: $fetchAuthorName, includeRecentComments: $includeRecentComments)
                    }
                }
            }
        }
    `, rootRef);


    const refetchList = () => {
        const count = Math.max(data.books?.edges?.length, 5)
        refetch({ first: count }, { fetchPolicy: 'store-and-network' });
    }



    return <>
        
        <Stack direction="column" spacing={1} marginY={2} marginRight={15}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>
                    {title}
                </Typography>

                <Button onClick={() => refetchList()} startIcon={<CachedIcon />}>Refetch</Button>
            </Stack>

            {data.books?.edges?.map((edge) => 
                { return edge.node && <BookItemFragment 
                    bookNodeRef={edge.node} 
                    key={edge.node.id} />}
            )}
        </Stack>

        {hasNext && 
            <LoadingButton 
                onClick={() => loadNext(2)}
                loading={isLoadingNext}
                variant="outlined">
                Load More
            </LoadingButton>
        }
    </>
}
