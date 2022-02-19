import { Suspense } from 'react';
import {  graphql, useLazyLoadQuery } from 'react-relay';
import { useCurrentUserId, useSelectedBookId, useUserType } from '../store';
import BasicBookDetails from './basicBookDetails';
import CommentsForBook from './bookcomments';
import CurrentUsersComments from './usercomments';
import { Typography } from '@mui/material';
import EditBookOptions from './EditBookOptions';
import { bookDetailsQuery } from './index';

export default () => {
    const [currentUserId] = useCurrentUserId();
    const [selectedBookId] = useSelectedBookId();
    const [userType] = useUserType();

    const data = useLazyLoadQuery(bookDetailsQuery, { bookId: selectedBookId,  currentUserId, isAuthor: userType === 'Author' });
    
    if (data.book === null) return null;
    
    return <>
        <BasicBookDetails bookNodeRef={data.book} />
        
        <Suspense fallback={null}>
            {userType === 'Author' ? 
                <EditBookOptions bookNodeRef={data.book}/> :
                <CurrentUsersComments bookNodeRef={data.book} />  
            }
       </Suspense>
       

        <Suspense fallback={null}>
            <Typography  marginTop={4} variant='body1'>
                All Comments
            </Typography>
            <CommentsForBook bookNodeRef={data.book} />  
        </Suspense>
    </>
}