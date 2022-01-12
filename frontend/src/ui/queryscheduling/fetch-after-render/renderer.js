import { useRef, useState } from 'react';
import {graphql, useQueryLoader, usePreloadedQuery}  from 'react-relay';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TimeRenderer = ({ startTime, queryReference }) => {
    const data = usePreloadedQuery(graphql`
            query rendererFetchAfter_Query($timeInMs: Int!) {
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


export default ({ startTime }) => {
    const [shouldShowContent, setShouldShowContent] = useState(false);
    const fetchTime = useRef(0);
    const [queryReference, load] = useQueryLoader(graphql`
        query rendererFetchAfterPreload_Query($timeInMs: Int!) {
            timer(ms: $timeInMs)
        }
    `);

    const onShowClick = () => {
        fetchTime.current = Date.now();
        load({ timeInMs: 2000 }, { fetchPolicy: 'network-only' });
        setShouldShowContent(true);
    }

    const renderTime = useRef(Date.now());
    return (
        <div>
            <Typography variant="body2">Loaded Component in {`${(renderTime.current - startTime)} msec`}</Typography>
            {!shouldShowContent ?
                <Button variant="outlined" onClick={onShowClick}>
                    Start Fetch Now
                </Button>
                : null
            }

            {shouldShowContent && <TimeRenderer startTime={fetchTime.current} queryReference={queryReference}/>}
        </div>
    );
}
