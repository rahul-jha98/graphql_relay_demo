import { usePreloadedQuery, graphql } from 'react-relay';
import BasicBookDetails from './basicBookDetails';
import CommentsForBook from './bookcomments';
import CurrentUsersComments from './usercomments';
import { bookDetailsQuery } from './index';
import { Typography } from '@mui/material';
import { Suspense } from 'react';
import EditBookOptions from './EditBookOptions';
import { useUserType } from '../store';

export default ({  queryReference }) => {
    const data = usePreloadedQuery(bookDetailsQuery, queryReference);

    const [userType] = useUserType();
    
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