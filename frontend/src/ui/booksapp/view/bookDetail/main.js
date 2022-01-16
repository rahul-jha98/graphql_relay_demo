import { usePreloadedQuery, graphql } from 'react-relay';
import BasicBookDetails from './basicBookDetails';
import CommentsForBook from '../fragments/commentConnectionFragment';
import CurrentUsersComments from './usercomments';
import { bookDetailsQuery } from './index';
import { Typography } from '@mui/material';
import { Suspense } from 'react';


export default ({  queryReference }) => {
    const data = usePreloadedQuery(bookDetailsQuery, queryReference);

    return <>
        <BasicBookDetails bookNodeRef={data.node} />
        
        {/* <Suspense fallback={null}>
            <UserBookComment bookNodeRef={data.node} />  
        </Suspense> */}
        
        <Suspense fallback={null}>
            <CurrentUsersComments bookNodeRef={data.node} />  
        </Suspense>

        <Suspense fallback={null}>
            <Typography variant='body1' marginTop={4}>
                All Comments
            </Typography>
            <CommentsForBook rootRef={data} />  
        </Suspense>
             
    </>
}