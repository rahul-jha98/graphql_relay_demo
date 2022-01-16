import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { usePreloadedQuery, graphql } from 'react-relay';
import BooksList from '../../fragments/bookConnectionFragment';
import { useCurrentUserId, useSelectedUserId } from "../../store";
import AddBookDialog from "./addBookModal";
import { booksByUserConnectionQuery } from "./index";
import AddIcon from '@mui/icons-material/Add';


export default ({ queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(booksByUserConnectionQuery, queryReference);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId] = useSelectedUserId();
    const [currentUserId] = useCurrentUserId();

    return <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" marginRight={15}>
            <Typography />
            {currentUserId === selectedUserId && 
                <Button 
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}>
                    New Book
                </Button>}
        </Stack>
        

        
        <BooksList rootRef={data} title="Books" />
        {isModalOpen && <AddBookDialog closeModal={() => setIsModalOpen(false)}/>}
    </>
}