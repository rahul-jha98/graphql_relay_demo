import { usePreloadedQuery, graphql } from 'react-relay';
import BooksList from '../fragments/bookConnectionFragment';
import { booksConnectionQuery } from '.';


export default ({  queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(booksConnectionQuery, queryReference);

    return <BooksList rootRef={data} showAuthorName={true}/>;
}