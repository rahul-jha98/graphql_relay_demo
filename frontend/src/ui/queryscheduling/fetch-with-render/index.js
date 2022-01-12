import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {lazy, Suspense, useState, useRef } from 'react';
import { useQueryLoader } from 'react-relay';

const RenderComponent = lazy(() => import('./renderer'));

export default () => {
    const [shouldShowContent, setShouldShowContent] = useState(false);
    const startTime = useRef(0);

    const [queryReference, load] = useQueryLoader(graphql`
        query fetchWithRender_Query($timeInMs: Int!) {
            timer(ms: $timeInMs)
        }
    `)

    const onShowClick = () => {
        startTime.current = Date.now();
        load({ timeInMs: 2000 }, { fetchPolicy: 'network-only' });
        setShouldShowContent(true);
    }
    return (<div>
        <Typography variant="body1">Fetch With Render</Typography>
        {!shouldShowContent ?
            <Button variant="outlined" onClick={onShowClick}>
                Load Content
            </Button>
            : null
        }
        <Typography marginBottom={1}>-</Typography>
        <Suspense fallback={<Typography>Loading</Typography>}>
            {shouldShowContent && <RenderComponent startTime={startTime.current} queryReference={queryReference}/>}
        </Suspense>
    </div>)
}