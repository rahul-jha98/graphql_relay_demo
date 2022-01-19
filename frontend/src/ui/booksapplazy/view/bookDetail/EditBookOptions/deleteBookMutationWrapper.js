import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useStoreActions } from '../../store';



const deleteBookMutation = graphql`
    mutation deleteBookMutationWrapper2Mutation($id: ID!) 
        @raw_response_type
        {

        removeBook(id: $id) {
            success
            messages

            deletedBookId @deleteRecord
        }
    }
`
export default ({ bookId, children }) => {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [, { setSelectedBookId }] = useStoreActions();
    const closeModal = () => {
        setShowConfirmation(false)
    }

    const showDeleteModal = () => {
        setShowConfirmation(true);
    }

    const [ commitMutation ] = useMutation(deleteBookMutation);

    const deleteBook = () => {
        commitMutation({
            variables: { id: bookId },
            optimisticResponse: {
                removeBook: {
                    success: true,
                    messages: [],
                    deletedBookId: bookId
                }
            },
            onCompleted: (response) => {
                if (!response.removeBook.success) {
                    setSelectedBookId('');
                }
            }
        });
        closeModal();
        setSelectedBookId('');
    }

    return <>
        {children( showDeleteModal )}


        <Dialog
            open={showConfirmation}
            onClose={closeModal}>
            <DialogTitle>
                {"Delete book?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will also delete all the comments for the book.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={deleteBook} autoFocus >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </>
}