import {useState} from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import Banner from './banner';


const updateBookMutation = graphql`
    mutation updateBookModalMutation($id: ID!, $updateInput: UpdateBookInput!) @raw_response_type {
        updateBook(id: $id, input: $updateInput) {
            success
            messages

            book {
                id
                year
                isbn
                description
            }
        }
    }
`;


export default ({ closeModal, bookId }) => {
    const data = useLazyLoadQuery(graphql`
        query updateBookModalQuery($bookId: ID!) {
            book(id: $bookId) {
                id
                name
                year
                isbn
                description
            }
        }
    `, { bookId });

    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [ commitMutation, isInFlight ] = useMutation(updateBookMutation);
    const [ isModalVisible, setIsModalVisible ] = useState(true);

    const book = data.book;
    if (!book) return null;


    const onSubmit = (data) => {
        const { description, year, isbn } = data;
        
        if (description === '' || year === '' || isbn === '') {
            setErrorMessage("Fields are empty");
            return;
        } 
        setErrorMessage('');

        const yearUpdate = year !== book.year ? { year: parseInt(year) } : {};
        const isbnUpdate = isbn !== book.isbn ? { isbn } : {};
        const descriptionUpdate = description !== book.description ? { description } : {};

        const updates = {...yearUpdate, ...isbnUpdate, ...descriptionUpdate };

        if (Object.keys(updates).length === 0) {
            setErrorMessage('No field was updated');
            return;
        }
        setIsModalVisible(false);
        commitMutation({
            variables: { id: bookId, updateInput: updates },
            optimisticResponse: {
                updateBook: {
                    success: true,
                    messages: [],
                    book: {
                        ...book,
                        ...updates
                    }
                }
            },
            onCompleted: ({ updateBook }) => {
                if (!updateBook.success) {
                    setIsModalVisible(true);
                    setErrorMessage(updateBook.messages[0]);
                } else {
                    closeModal();
                }
            },
            onError: () => {
                setIsModalVisible(true);
                setErrorMessage("Something went wrong");
            }
        });
    }


    return (
        <Dialog open={isModalVisible} onClose={closeModal} maxWidth='xs' fullWidth>
            <DialogTitle>Edit Book - {book.name}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack
                        direction="column"
                        spacing={3}
                        margin={1}
                        sx={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    >
                        {errorMessage && <Banner message={errorMessage} />}
                        
                        <TextField 
                            label="Year Published" 
                            fullWidth
                            size="small"
                            type="number"
                            defaultValue={book.year}
                            InputProps={{...register('year')}} />

                        <TextField 
                            label="ISBN" 
                            fullWidth
                            size="small"
                            defaultValue={book.isbn}
                            InputProps={{...register('isbn')}} />

                        <TextField 
                            label="Description" 
                            fullWidth
                            size="small"
                            multiline
                            maxRows={4}
                            minRows={3}
                            defaultValue={book.description}
                            InputProps={{...register('description')}} />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeModal} disabled={isInFlight}>Cancel</Button>
                    <LoadingButton variant='contained' type="submit" loading={isInFlight}>Update</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
