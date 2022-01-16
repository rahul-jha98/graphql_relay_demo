import { usePreloadedQuery, graphql } from 'react-relay';
import BooksList from '../fragments/bookConnectionFragment';
import { booksConnectionQuery } from '.';


export default ({  queryReference }) => {
    const data = usePreloadedQuery(booksConnectionQuery, queryReference);

    return <BooksList rootRef={data} title="All Books"/>;
}