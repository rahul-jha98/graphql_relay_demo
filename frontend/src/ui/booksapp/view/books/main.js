import { usePreloadedQuery, graphql } from 'react-relay';
import BooksPagination from './BooksPagination';

export const booksConnectionQuery = graphql`
     query mainBooksConnectionQuery {
         ...BooksPaginationFragment
     }
`;

export default ({  queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(booksConnectionQuery, queryReference);

    return <BooksPagination rootRef={data}/>;
}