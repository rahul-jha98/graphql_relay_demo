import { lazy, Suspense, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
import { booksConnectionQuery } from './main';
const Books = lazy(() => import('./main'));


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