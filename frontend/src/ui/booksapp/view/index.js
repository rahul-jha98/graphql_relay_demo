import Grid from '@mui/material/Grid';
import Profile from './profile';
import Books from './books';
import BookDetail from './bookDetail';
import {StoreContainer} from './store';

export default ({ userid }) => {
    return (
        <StoreContainer currentUserId={userid}>
            <Grid container spacing={2} marginLeft={0} marginTop={.5} sx={{height: '93vh'}}>
                <Grid item xs={4}>
                    <Profile/>
                </Grid>
                <Grid item xs={4}>
                    <Books />
                </Grid>
                <Grid item xs={4}>
                    <BookDetail />
                </Grid>
            </Grid>
        </StoreContainer>
    );
}