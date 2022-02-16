import { lazy, Suspense, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import SkeletonFallback from './fallback';
import { useCurrentUserId, useSelectedBookId, useUserType } from '../store';
const BookDetail = lazy(() => import('./main'));

export const nameSkeletonPropsArray = [{variant: "h5", width: "40%"}];
export const yearSkeletonPropsArray = [{variant: "caption", marginBottom: 2, display: "block", width: "15%"}];
export const authorSkeletopPropsArray = [{variant: "subtitle1"}];
export const isbnSkeletopPropArray = [{variant: "body2", width: "20%", marginBottom: 2}];
export const descriptionSkeletonPropArray = [{variant: "button", width: "20%", display:"block"}, {variant: "subtitle2", width: "40%"}]

const skeletonArray = [...nameSkeletonPropsArray,
    ...authorSkeletopPropsArray, 
    ...yearSkeletonPropsArray,
    ...isbnSkeletopPropArray,
    ...descriptionSkeletonPropArray];


export const bookDetailsQuery = graphql`
     query bookDetailQuery($bookId: ID!,  $currentUserId: ID!, $isAuthor: Boolean!) {
         book(id: $bookId) {
            id
            ...basicBookDetailsFragment
            ...usercommentsForBookFragment @arguments(user_id: $currentUserId) @skip(if: $isAuthor)
            ...EditBookOptionsFragment @include(if: $isAuthor)
            ...bookcommentsConnectionFragment @arguments(first: 4, fetchBookDetail: false, skipUser: false)
         } 
     }
`;  

export default () => {
    const [bookQueryReference, loadBook] = useQueryLoader(bookDetailsQuery);
    const [selectedBookId] = useSelectedBookId();
    const [currentUserId] = useCurrentUserId();
    const [userType] = useUserType();


    useEffect(() => {
        if (selectedBookId) {
            loadBook({ bookId: selectedBookId,  currentUserId, isAuthor: userType === 'Author' });
        }
    }, [selectedBookId, currentUserId, userType]);
    
    if (selectedBookId === '') return null;
    return (
        <Suspense fallback={<SkeletonFallback propsArray={skeletonArray}/>}>
            {bookQueryReference && <BookDetail queryReference={bookQueryReference}/>}
        </Suspense>
    );
}