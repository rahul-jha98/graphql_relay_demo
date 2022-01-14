import {useState} from 'react';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useMutation, graphql, ConnectionHandler } from "react-relay";
import Banner from './banner';

const AddBookMutation = graphql`
  mutation AddBookModalMutation($name: String!, $description: String!, $year: Int!, $isbn: String!, $authorId: ID!, $connections: [ID!]!) {
    addBook(name: $name,
            description: $description,
            year: $year,
            isbn: $isbn,
            author: $authorId) {
        book @appendNode(connections: $connections, edgeTypeName: "BookEdge") {
            id
            name
            isbn
            year
        }
    }
  }
`;

export default function AddBookDialog({ closeModal }) {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [commitMutation, isInFlight] = useMutation(AddBookMutation);
    
    
    const onSubmit = (data) => {
        const { name, description, year, isbn} = data;

        const authorId = window.sessionStorage.getItem('userid');
        const allBooksConnectionId = ConnectionHandler.getConnectionID("root", "PaginatedList_books");
        const booksByAuthorConnectionId = ConnectionHandler.getConnectionID("root",
                                                                             "PaginatedList_books", 
                                                                             { author_id: authorId });
        
        console.log([booksByAuthorConnectionId, allBooksConnectionId]);
        if (name === '' || description === '' || year === '' || isbn === '') {
            setErrorMessage("Fields are empty");
            return;
        } 
        setErrorMessage('');
        commitMutation({
            variables: {
                name,
                description,
                year: parseInt(year),
                isbn,
                authorId,
                connections: [booksByAuthorConnectionId, allBooksConnectionId],
            },
            onCompleted: ({ addBook: book}) => {
                console.log(book);
                closeModal();
            },
            onError: (err) => {
                setErrorMessage(err.message);
            }
        })
    }

    return (
        <Dialog open onClose={closeModal} maxWidth='xs' fullWidth>
            <DialogTitle>Add Book</DialogTitle>
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
                            label="Name" 
                            fullWidth
                            size="small"
                            InputProps={{...register('name')}} />
                        
                        <TextField 
                            label="Year Published" 
                            fullWidth
                            size="small"
                            type="number"
                            defaultValue={2022}
                            InputProps={{...register('year')}} />

                        <TextField 
                            label="ISBN" 
                            fullWidth
                            size="small"
                            InputProps={{...register('isbn')}} />

                        <TextField 
                            label="Description" 
                            fullWidth
                            size="small"
                            multiline
                            maxRows={4}
                            minRows={3}
                            InputProps={{...register('description')}} />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeModal} disabled={isInFlight}>Cancel</Button>
                    <Button variant='contained' type="submit" disabled={isInFlight}>Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
