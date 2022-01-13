import { usePreloadedQuery, graphql } from 'react-relay';
import BooksList from '../fragments/bookConnectionFragment';

export const booksConnectionQuery = graphql`
     query mainBooksConnectionQuery($first: Int!) {
         ...bookConnectionFragment @arguments(first: $first)
     }
`;

export default ({  queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(booksConnectionQuery, queryReference);

    return <BooksList rootRef={data} showAuthorName={true}/>;
}