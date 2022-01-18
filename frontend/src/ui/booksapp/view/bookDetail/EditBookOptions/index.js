import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCurrentUserId } from '../../store';
import { useFragment, graphql } from 'react-relay';
import DeleteBookMutationWrapper from './deleteBookMutationWrapper';
import UpdateBookModal from './updateBookModal';
import { useState, Suspense } from 'react';

export default ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment EditBookOptionsFragment on Book
        {
            id
            author {
                id
            }
        }
    `, bookNodeRef);

    const [currentUserId] = useCurrentUserId();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    
    if (book?.author?.id !== currentUserId) return null;

    return (<Stack direction="row" marginRight={15} spacing={1} marginTop={2}> 

        <IconButton size="small" sx={{float: 'right'}} onClick={() => setShowUpdateModal(true) }>
            <EditIcon sx={{ fontSize: 18 }}/>
        </IconButton>

        <Suspense fallback={null}>
            {showUpdateModal && <UpdateBookModal closeModal={() => setShowUpdateModal(false)} bookId={book.id}/>}
        </Suspense>
        

        <DeleteBookMutationWrapper bookId={book.id}>
            {(showDeleteModal) => 
                 <IconButton size="small" sx={{float: 'right'}} onClick={showDeleteModal}>
                    <DeleteIcon sx={{ fontSize: 18 }}/>
                </IconButton>
            }
        </DeleteBookMutationWrapper>
       
    </Stack>);
}