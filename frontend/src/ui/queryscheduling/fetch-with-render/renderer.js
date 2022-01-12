import { useRef } from 'react';
import {graphql, useLazyLoadQuery, usePreloadedQuery}  from 'react-relay';
import Typography from '@mui/material/Typography';

export default ({ startTime, queryReference }) => {
    const data = usePreloadedQuery(graphql`
            query rendererFetchWith_Query($timeInMs: Int!) {
                timer(ms: $timeInMs)
            }
        `, 
        queryReference
    );

    const endTime = useRef(Date.now());
    
    return <Typography variant="h6" gutterBottom component="h6">
                {`${(endTime.current - startTime)} msec`}
            </Typography>
}