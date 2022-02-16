import Typography from '@mui/material/Typography';
import { useLazyLoadQuery } from 'react-relay';
import CommentsPaginatedList from '../../fragments/commentConnectionFragment';
import { commentsByUserConnectionQuery } from './index';




export default ({ userId }) => {
    const data = useLazyLoadQuery(commentsByUserConnectionQuery, { first: 5, userId });

    return <>
        <Typography>
            Comments
        </Typography>
        <CommentsPaginatedList rootRef={data} />
    </>
}