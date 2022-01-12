import { useRef } from 'react';
import {graphql, useLazyLoadQuery}  from 'react-relay';
import Typography from '@mui/material/Typography';

export default ({ startTime }) => {
    const timeInMs = 2000;
    const data = useLazyLoadQuery(graphql`
            query rendererFetchOn_Query($timeInMs: Int!) {
                timer(ms: $timeInMs)
            }
        `, 
        { timeInMs },
        { fetchPolicy: 'network-only'}
    );
    
    const endTime = useRef(Date.now());
    return <Typography variant="h6" gutterBottom component="h6">
                {`${(endTime.current - startTime)} msec`}
            </Typography>
}