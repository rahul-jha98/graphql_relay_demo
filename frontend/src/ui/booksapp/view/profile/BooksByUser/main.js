import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { usePreloadedQuery, graphql } from 'react-relay';
import BooksList from '../../fragments/bookConnectionFragment';
import AddBookDialog from "./AddBookModal";
import { booksByUserConnectionQuery } from "./index";


export default ({ queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(booksByUserConnectionQuery, queryReference);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return <>
        <Typography>
            Books
        </Typography>
        <Button onClick={() => setIsModalOpen(true)}>Add Book</Button>
        <BooksList rootRef={data} showAuthorName={false} />
        {isModalOpen && <AddBookDialog closeModal={() => setIsModalOpen(false)}/>}
    </>
}