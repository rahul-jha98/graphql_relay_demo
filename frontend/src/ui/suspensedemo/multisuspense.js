import { Suspense } from 'react';
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
    return (
        <div>  
            <Typography variant="body1" gutterBottom component="div" marginBottom={4}>
                {label}
            </Typography>

            {!isShuffling && 
                <Stack direction="column" spacing={2} width={200}>
                    {timeArray.map(time => {
                            return (
                                <Suspense fallback={<Fallback />} key={time}>
                                    <TimerButton timeInMs={time}/>
                                </Suspense>
                            );
                        }
                    )}
                </Stack>
            }
        </div>
    );
}