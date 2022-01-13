import { lazy, Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../../fallback';
import { booksByUserConnectionQuery } from './main';
const BooksByUser = lazy(() => import('./main'));


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