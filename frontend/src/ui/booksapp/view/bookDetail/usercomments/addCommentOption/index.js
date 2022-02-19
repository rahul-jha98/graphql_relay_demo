import {useState} from 'react';
import { useForm } from "react-hook-form";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { ROOT_ID } from 'relay-runtime';
import { useMutation, graphql, ConnectionHandler } from "react-relay";
import { useCurrentUserId } from '../../../store';

const AddCommentMutation = graphql`
  mutation addCommentOptionMutation($message: String!, $user_id: ID!, $book_id: ID!, $connections: [ID!]!) {
    addComment(message: $message,
            user_id: $user_id,
            book_id: $book_id) {
        comment @prependNode(connections: $connections, edgeTypeName: "CommentEdge") {
            id
            message
            timestamp
            book {
                id
            }
            user {
                id
            }
        }
    }
  }
`;

export default function AddCommentOption ({ userCommentConnectionId, bookId }) {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [commitMutation, isInFlight] = useMutation(AddCommentMutation);

    const [currentUserId] = useCurrentUserId();

    const onSubmit = (data) => {
        const { comment } = data;
        console.log(comment);
        if (!comment) {
            setErrorMessage("Connot be empty");
            return;
        }
        setErrorMessage("");
 
        const bookCommentsConnectionId = ConnectionHandler.getConnectionID(bookId, "Book_comments");
        const allUserCommentsConnectionId = ConnectionHandler.getConnectionID(ROOT_ID, "PaginatedList_comments", { user_id: currentUserId });

        commitMutation({
            variables: {
                message: comment,
                user_id: currentUserId,
                book_id: bookId,
                connections: [bookCommentsConnectionId, userCommentConnectionId, allUserCommentsConnectionId],
            },
            onError: (err) => {
                setErrorMessage(err.message);
            }
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '30ch', display: 'block', mb: 1 },
            }}
            noValidate
            autoComplete="off"
            marginTop={4}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField 
                label="Your Comment"
                variant="standard"
                fullWidth
                multiline
                InputProps={{...register('comment')}}
                error={errorMessage !== ''}
                helperText={errorMessage}
                />
            <LoadingButton type="submit" loading={isInFlight}>Add Comment</LoadingButton>
        </Box>
    );
}
