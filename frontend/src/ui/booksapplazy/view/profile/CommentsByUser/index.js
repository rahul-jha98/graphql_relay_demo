import { lazy, Suspense, useEffect } from 'react';
import Fallback from '../../fallback';
import Typography from '@mui/material/Typography';
import { useLazyLoadQuery, graphql } from 'react-relay';
import CommentsPaginatedList from '../../fragments/commentConnectionFragment';


export const commentsByUserConnectionQuery = graphql`
     query CommentsByUseronnection2Query($first: Int!, $userId: ID ) {
         ...commentConnectionFragment2Fragment @arguments(first: $first, user_id: $userId, fetchBookDetail: true)
     }
`;




const CommentsByUser = ({ userId }) => {
    const data = useLazyLoadQuery(commentsByUserConnectionQuery, { first: 5, userId });

    return <>
        <Typography>
            Comments
        </Typography>
        <CommentsPaginatedList rootRef={data} />
    </>
}

export default ({ userId }) => {   
    return (
        <Suspense fallback={<Fallback />}>
            <CommentsByUser userId={userId} />
        </Suspense>
    );
}