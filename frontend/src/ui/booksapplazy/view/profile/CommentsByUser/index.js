import { lazy, Suspense} from 'react';
import Fallback from '../../fallback';
import { graphql } from 'react-relay';
const CommentsByUser = lazy(() => import('./main'));

export const commentsByUserConnectionQuery = graphql`
     query CommentsByUseronnection2Query($first: Int!, $userId: ID ) {
         ...commentConnectionFragment2Fragment @arguments(first: $first, user_id: $userId, fetchBookDetail: true)
     }
`;


export default ({ userId }) => {  
    if (!userId) return null; 
    return (
        <Suspense fallback={<Fallback />}>
            <CommentsByUser userId={userId} />
        </Suspense>
    );
}