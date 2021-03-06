import { lazy, Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../../fallback';
const BooksByUser = lazy(() => import('./main'));

export const booksByUserConnectionQuery = graphql`
     query BooksByUserConnectionQuery($first: Int!, $authorId: ID ) {
         ...bookConnectionFragment @arguments(first: $first, author_id: $authorId, fetchAuthorName: false, includeRecentComments: true)
     }
`;

export default ({ authorId }) => {
    const [booksQueryReference, loadBooks] = useQueryLoader(booksByUserConnectionQuery);

    useEffect(() => {
        if (authorId) {
            loadBooks({ first: 5, authorId });
        }
    }, [authorId]);
    
    return (
        <Suspense fallback={<Fallback />}>
            {booksQueryReference && <BooksByUser queryReference={booksQueryReference} />}
        </Suspense>
    );
}