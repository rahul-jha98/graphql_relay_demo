import { lazy, Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../../fallback';
const CommentsByUser = lazy(() => import('./main'));

export const commentsByUserConnectionQuery = graphql`
     query CommentsByUseronnectionQuery($first: Int!, $userId: ID ) {
         ...commentConnectionFragment @arguments(first: $first, user_id: $userId, fetchBookDetail: true)
     }
`;

export default ({ userId }) => {
    const [commentsQueryReference, loadComments] = useQueryLoader(commentsByUserConnectionQuery);

    useEffect(() => {
        loadComments({ first: 5, userId });
    }, [userId]);
    
    return (
        <Suspense fallback={<Fallback />}>
           {commentsQueryReference && <CommentsByUser queryReference={commentsQueryReference} />}
        </Suspense>
    );
}