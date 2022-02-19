import { lazy, Suspense } from 'react';
import {  graphql } from 'react-relay';
import SkeletonFallback from './fallback';
import { useSelectedBookId } from '../store';
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
     query bookDetail2Query($bookId: ID!,  $currentUserId: ID!, $isAuthor: Boolean!) {
         book(id: $bookId) {
            id
            ...basicBookDetails2Fragment
            ...usercommentsForBook2Fragment @arguments(user_id: $currentUserId) @skip(if: $isAuthor)
            ...EditBookOptions2Fragment @include(if: $isAuthor)
            ...bookcomments2ConnectionFragment @arguments(first: 4)
         }
     }
`;  




export default () => {  
    const [selectedBookId] = useSelectedBookId();
    if (selectedBookId === '') return null;
    return (
        <Suspense fallback={<SkeletonFallback propsArray={skeletonArray}/>}>
            <BookDetail />
        </Suspense>
    );
}



