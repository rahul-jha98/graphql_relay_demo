import { lazy, Suspense, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import SkeletonFallback from './fallback';
import { useSelectedBookId } from '../store';
const BookDetail = lazy(() => import('./main'));

export const nameSkeletonPropsArray = [{variant: "h5", width: "40%"}];
export const yearSkeletonPropsArray = [{variant: "caption", marginBottom: 2, display: "block", width: "15%"}];
export const authorSkeletopPropsArray = [{variant: "subtitle1"}];
export const isbnSkeletopPropArray = [{variant: "body2", width: "20%", marginBottom: 2}];
export const descriptionSkeletonPropArray = [{variant: "button", width: "20%", display:"block"}, {variant: "subtitle2", width: "60%"}]

export const bookDetailsQuery = graphql`
     query bookDetailQuery($bookId: ID!) {
         node(id: $bookId) {
             id
             ...on Book {
                 ...basicBookDetailsFragment
                 ...commentsForBookFragment
             }
         }
     }
`;

export default () => {
    const [bookQueryReference, loadBook] = useQueryLoader(bookDetailsQuery);
    const [selectedBookId] = useSelectedBookId();
    useEffect(() => {
        if (selectedBookId) {
            loadBook({ bookId: selectedBookId });
        }
    }, [selectedBookId]);
    
    return (
        <Suspense fallback={<SkeletonFallback propsArray={
            [...nameSkeletonPropsArray,
            ...authorSkeletopPropsArray, 
            ...yearSkeletonPropsArray,
            ...isbnSkeletopPropArray,
            ...descriptionSkeletonPropArray]
        }/>}>
            {bookQueryReference && <BookDetail queryReference={bookQueryReference}/>}
        </Suspense>
    );
}