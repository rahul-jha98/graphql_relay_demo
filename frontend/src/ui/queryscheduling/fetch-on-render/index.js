import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {lazy, Suspense, useState, useRef } from 'react';

const RenderComponent = lazy(() => import('./renderer'));

export default () => {
    const [shouldShowContent, setShouldShowContent] = useState(false);
    const startTime = useRef(0);
    const onShowClick = () => {
        startTime.current = Date.now();

        setShouldShowContent(true);
    }
    return (<div>
        <Typography variant="body1">Fetch On Render</Typography>
        {!shouldShowContent ?
            <Button variant="outlined" onClick={onShowClick}>
                Load Content
            </Button>
            : null
        }
        <Typography marginBottom={1}>-</Typography>
        <Suspense fallback={<Typography>Loading</Typography>}>
            {shouldShowContent && <RenderComponent startTime={startTime.current} />}
        </Suspense>
    </div>)
}