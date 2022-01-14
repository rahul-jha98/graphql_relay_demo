import { lazy, Suspense, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
const Books = lazy(() => import('./main'));

export const booksConnectionQuery = graphql`
     query booksConnectionQuery($first: Int!) {
         ...bookConnectionFragment @arguments(first: $first)
     }
`;

export default () => {
    const [booksQueryReference, loadBooks] = useQueryLoader(booksConnectionQuery);

    useEffect(() => {
        loadBooks({ first: 5 });
    }, []);
    
    return (
        <Suspense fallback={<Fallback />}>
            <Books queryReference={booksQueryReference}/>
        </Suspense>
    );
}