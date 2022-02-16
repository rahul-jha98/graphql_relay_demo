import { lazy, Suspense } from 'react';
import Fallback from '../../fallback';
import {  graphql } from 'react-relay';

const BooksByUser = lazy(() => import('./main'));

export const booksByUserConnectionQuery = graphql`
     query BooksByUserConnection2Query($first: Int!, $authorId: ID ) {
         ...bookConnectionFragment2Fragment @arguments(first: $first, author_id: $authorId, fetchAuthorName: false, includeRecentComments: true)
     }
`;



export default ({ authorId }) => {   
    if (!authorId) {
        return null;
    } 
    return (
        <Suspense fallback={<Fallback />}>
            <BooksByUser authorId={authorId} />
        </Suspense>
    );
}