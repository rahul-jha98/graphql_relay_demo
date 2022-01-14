import { lazy, Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../../fallback';
const BooksByUser = lazy(() => import('./main'));

export const booksByUserConnectionQuery = graphql`
     query BooksByUserConnectionQuery($first: Int!, $authorId: ID ) {
         ...bookConnectionFragment @arguments(first: $first, author_id: $authorId)
     }
`;

export default ({ authorId }) => {
    const [booksQueryReference, loadBooks] = useQueryLoader(booksByUserConnectionQuery);

    useEffect(() => {
        loadBooks({ first: 5, authorId });
    }, []);
    
    return (
        <Suspense fallback={<Fallback />}>
            <BooksByUser queryReference={booksQueryReference} />
        </Suspense>
    );
}