import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { Suspense } from "react";
import SkeletonFallback from "../fallback";
import AuthorDetails from './authorDetails';
import {nameSkeletonPropsArray, yearSkeletonPropsArray, authorSkeletopPropsArray, isbnSkeletopPropArray, descriptionSkeletonPropArray} from '..';

const Name = ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment basicBookDetailsNameFragment on Book
        {
            name
        }
    `, bookNodeRef);
    return <Typography variant="h5">{book.name}</Typography>
}


const Year = ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment basicBookDetailsYearFragment on Book
        {
            year
        }
    `, bookNodeRef);
    return <Typography variant="caption" marginBottom={2} display="block">- {book.year}</Typography>
}

const Isbn = ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment basicBookDetailsIsbnFragment on Book
        {
            isbn
        }
    `, bookNodeRef);
    return <Typography variant="body2" marginBottom={2}>ISBN: {book.isbn}</Typography>
}

const Description = ({ bookNodeRef }) => {
    const book = useFragment(graphql`
    fragment basicBookDetailsDescriptionFragment on Book
    {
        description
    }
    `, bookNodeRef);
    return  <>
        <Typography variant="button" display="block">Description</Typography>
        <Typography variant="subtitle2">{book.description ? book.description : "-"}</Typography>
    </>
}


export default ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment basicBookDetailsFragment on Book
        {
            ...basicBookDetailsNameFragment
            ...basicBookDetailsYearFragment
            ...basicBookDetailsIsbnFragment
            ...basicBookDetailsDescriptionFragment
            ...authorDetailsFragment
        }
    `, bookNodeRef);

    return <>
        <Suspense fallback={<SkeletonFallback propsArray={nameSkeletonPropsArray} />}>
            <Name bookNodeRef={book} />
        </Suspense>

        <Suspense fallback={authorSkeletopPropsArray}>
            <AuthorDetails bookNodeRef={book} />
        </Suspense>
        
        <Suspense fallback={<SkeletonFallback propsArray={yearSkeletonPropsArray} />}>
            <Year bookNodeRef={book} />
        </Suspense>

        <Suspense fallback={<SkeletonFallback propsArray={isbnSkeletopPropArray} />}>
            <Isbn bookNodeRef={book}/>
        </Suspense>

        <Suspense fallback={<SkeletonFallback propsArray={descriptionSkeletonPropArray} />}>
            <Description bookNodeRef={book}/>
        </Suspense>
    </>
}