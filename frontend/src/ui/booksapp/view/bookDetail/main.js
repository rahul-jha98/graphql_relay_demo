import { usePreloadedQuery, graphql } from 'react-relay';
import BasicBookDetails from './basicBookDetails';
import BookComments from './comments';
import { bookDetailsQuery } from './index';


export default ({  queryReference }) => {
    const data = usePreloadedQuery(bookDetailsQuery, queryReference);

    return <>
        <BasicBookDetails bookNodeRef={data.node} />
        <BookComments bookNodeRef={data.node} />
    </>
}