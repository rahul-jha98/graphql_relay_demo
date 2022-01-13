import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={24}/>
      </Box>
    );
  }