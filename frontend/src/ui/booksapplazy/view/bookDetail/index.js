import { lazy, Suspense, useEffect, useState } from 'react';
import {  graphql, useLazyLoadQuery } from 'react-relay';
import SkeletonFallback from './fallback';
import { useCurrentUserId, useSelectedBookId, useUserType } from '../store';
import BasicBookDetails from './basicBookDetails';
import CommentsForBook from '../fragments/commentConnectionFragment';
import CurrentUsersComments from './usercomments';
import { Typography } from '@mui/material';
import EditBookOptions from './EditBookOptions';

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
         }
         ...commentConnectionFragment2Fragment @arguments(first: 4, book_id: $bookId, fetchBookDetail: false, skipUser: false) 
     }
`;  


const BookDetail = () => {
    const [currentUserId] = useCurrentUserId();
    const [selectedBookId] = useSelectedBookId();
    const [userType] = useUserType();

    const data = useLazyLoadQuery(bookDetailsQuery, { bookId: selectedBookId,  currentUserId, isAuthor: userType === 'Author' });
    
    
    return <>
        <BasicBookDetails bookNodeRef={data.book} />
        
        {userType === 'Author' ? 
            <EditBookOptions bookNodeRef={data.book}/> :
            <Suspense fallback={null}>
                <CurrentUsersComments bookNodeRef={data.book} />  
            </Suspense>
        }
       

        <Suspense fallback={null}>
            <Typography  marginTop={4} variant='body1'>
                All Comments
            </Typography>
            <CommentsForBook rootRef={data} />  
        </Suspense>
    </>
}


export default () => {  
    const [selectedBookId] = useSelectedBookId();
    if (selectedBookId === '') return null;
    return (
        <Suspense fallback={<SkeletonFallback propsArray={skeletonArray}/>}>
            <BookDetail />
        </Suspense>
    );
}



