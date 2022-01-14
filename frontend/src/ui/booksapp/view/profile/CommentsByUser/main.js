import { usePreloadedQuery, graphql } from 'react-relay';
import CommentsPaginatedList from '../../fragments/commentConnectionFragment';
import { commentsByUserConnectionQuery } from './index';


export default ({ queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(commentsByUserConnectionQuery, queryReference);

    return <CommentsPaginatedList rootRef={data} showBookName={false} />;
}