import { lazy, Suspense, useEffect, useState } from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay';
import Fallback from '../fallback';
import BooksList from '../fragments/bookConnectionFragment';

export const booksConnectionQuery = graphql`
     query booksConnection2Query($first: Int!) {
         ...bookConnectionFragment2Fragment @arguments(first: $first)
     }
`;

const Books = () => {
    const data = useLazyLoadQuery(booksConnectionQuery, { first: 5 });

    return <BooksList rootRef={data} title="All Books"/>;
}

export default () => {    
    return (
        <Suspense fallback={<Fallback />}>
            <Books />
        </Suspense>
    );
}