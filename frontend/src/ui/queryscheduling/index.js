import Stack from '@mui/material/Stack';

import FetchWithRender from './fetch-with-render';
import FetchOnRender from './fetch-on-render';   
import FetchAfterRender from './fetch-after-render';

export default () => {

    return <>
        <Stack direction="row" spacing={24} margin={5}>
            <FetchWithRender />
            <FetchOnRender />
            <FetchAfterRender />
        </Stack>
    </>
}