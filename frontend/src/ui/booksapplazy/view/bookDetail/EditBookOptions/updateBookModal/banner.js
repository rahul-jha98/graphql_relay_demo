import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

export default ({message}) => (
    <Card variant='outlined' sx={{backgroundColor: red[100]}}>
        <Typography variant="body2" margin={2} color={red[700]}>
            {message}
        </Typography>
    </Card>
)