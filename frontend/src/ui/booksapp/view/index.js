import Grid from '@mui/material/Grid';
import Profile from './profile';
import Books from './books';

export default ({ userid }) => {
    return (
        <Grid container spacing={2} marginTop={.5} sx={{height: '93vh'}}>
            <Grid item xs={4}>
                <Profile userid={userid}/>
            </Grid>
            <Grid item xs={4}>
                <Books />
            </Grid>
            <Grid item xs={4}>
                Profile
            </Grid>
        </Grid>
    );
}