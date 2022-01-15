import { graphql, useLazyLoadQuery } from "react-relay";
import PaginatedCommentsList from '../../fragments/commentConnectionFragment';

export default ({ book_id}) => {
    const data = useLazyLoadQuery(graphql`
        query mainFullBookCommentsQuery($book_id: ID!)
        {
            ...commentConnectionFragment @arguments(book_id: $book_id, fetchBookDetail: false)
        }
    `, { book_id: book_id });

    return <PaginatedCommentsList rootRef={data} />
}