import { Suspense, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TimerButton from './timerbutton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Fallback = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={24}/>
    </Box>
  );
}

export default ({ timeArray, label, isShuffling }) => {
    const [brokenList, setBrokenList] = useState([]);
    useEffect(() => {
        let lastIdx = 0;
        const listChunks = [];
        for(let i = 1; i < timeArray.length; i++) {
            if (timeArray[i] > timeArray[lastIdx]) {
                listChunks.push(timeArray.slice(lastIdx, i));
                lastIdx = i;
            }
        }
        listChunks.push(timeArray.slice(lastIdx));
        console.log(listChunks);
        setBrokenList(listChunks);
        
    }, [timeArray]);

    return (
        <div>  
            <Typography variant="body1" gutterBottom component="div" marginBottom={4}>
                {label}
            </Typography>
            {!isShuffling && 
                <Stack direction="column" spacing={2} width={200}>
                        {brokenList.map(batch => {
                                return (
                                    <Suspense fallback={batch.map(() => <Fallback />)}>
                                        {batch.map((time) => <TimerButton timeInMs={time}/>)}
                                    </Suspense>
                                );
                            }
                        )}
                </Stack>
            }
        </div>
    );
}

// SuspenseList is experimental and will be part of react 18
// we have mocked the implementation to understand how it will look visually


// export default ({ timeArray, label, isShuffling }) => {
//     return (
//         <div>  
//             <h4>{label}</h4>
//             {!isShuffling && 
//                 <Stack direction="column" spacing={2} width={200}>
//                     <SuspenseList>
//                         {timeArray.map(time => {
//                                 return (
//                                     <Suspense fallback={<Fallback />}>
//                                         <TimerButton timeInMs={time}/>
//                                     </Suspense>
//                                 );
//                             }
//                         )}
//                     </SuspenseList>
//                 </Stack>
//             }
//         </div>
//     );
// }