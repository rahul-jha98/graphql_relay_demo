import Typography from '@mui/material/Typography';
import { usePreloadedQuery, graphql } from 'react-relay';
import CommentsPaginatedList from '../../fragments/commentConnectionFragment';
import { commentsByUserConnectionQuery } from './index';


export default ({ queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(commentsByUserConnectionQuery, queryReference);

    return <>
        <Typography>
            Comments
        </Typography>
        <CommentsPaginatedList rootRef={data} />
    </>
}