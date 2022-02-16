import { lazy, Suspense, useEffect, useState } from 'react';
import Fallback from '../../fallback';
import { Button, Stack, Typography } from "@mui/material";
import {  useLazyLoadQuery } from 'react-relay';
import BooksList from '../../fragments/bookConnectionFragment';
import { useCurrentUserId, useSelectedUserId } from "../../store";
import AddBookDialog from "./addBookModal";
import AddIcon from '@mui/icons-material/Add';
import { booksByUserConnectionQuery } from './index';

export default ({ authorId }) => {
    const data = useLazyLoadQuery(booksByUserConnectionQuery, { first: 5, authorId });

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