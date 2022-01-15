import { Button } from "@mui/material";
import { useState } from "react";
import { graphql, useFragment } from "react-relay";
import CommentsList from '../../fragments/commentEdgesFragment';
import FullCommentsList from './main';

const LoadFullCommentsList = ({ book_id }) => {
    const [clicked, setClicked] = useState(false);
    
    return <>
        {clicked ? 
            <FullCommentsList book_id={book_id} /> :
            <Button onClick={() => setClicked(true)}>See All</Button>
        }
    </>
}

export default ({ bookNodeRef }) => {
    const data = useFragment(graphql`
        fragment commentsForBookFragment on Book
        {
            comments(first: 4) @connection(key: "PaginatedListCommentsForBook_comments") {
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: false)
            }
            id
        }
    `, bookNodeRef);

    return <>
        <CommentsList commentConnectionRef={data?.comments} />
        { <LoadFullCommentsList book_id={data.id}/>}
    </>
}