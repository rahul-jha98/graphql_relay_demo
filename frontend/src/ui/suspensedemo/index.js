import { Button } from '@mui/material';
import { useState } from 'react';
import Stack from '@mui/material/Stack';

import SingleSuspense from './singlesuspense';
import MultiSuspense from './multisuspense';
import MultiSuspenseWithForwardReveal from './forwardreveal';

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

const getRandomTimeArray = () => {
    return [...shuffleArray([500, 1000, 2000, 2500]), ...shuffleArray([3000, 4000, 5000])]
}

export default () => {
    const [timeArray, setTimeArray] = useState(getRandomTimeArray);
    const [isShuffling, setIsShuffling] = useState(false);
    const onRedraw = () => {
        if (isShuffling) return;
        setIsShuffling(true);
        setTimeout(() => {
            setTimeArray(getRandomTimeArray());
            setIsShuffling(false);
        })
    }
    return <>
        <Button onClick={onRedraw}>Redraw</Button>
        <Stack direction="row" spacing={16} margin={5}>
            <SingleSuspense timeArray={timeArray} label="Single top level Suspense" isShuffling={isShuffling} />
            <MultiSuspense timeArray={timeArray} label="Suspense for each timer" isShuffling={isShuffling} />
            <MultiSuspenseWithForwardReveal timeArray={timeArray} label="Suspense for each timer with SuspenseList" isShuffling={isShuffling} />
        </Stack>
    </>
}