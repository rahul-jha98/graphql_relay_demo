import Grid from '@mui/material/Grid';
import { lazy, Suspense, useEffect } from 'react';
import { useQueryLoader, graphql } from 'react-relay';
import Fallback from './fallback';
import { profileQuery } from './profile';
const Profile = lazy(() => import('./profile'));


export default ({ userid }) => {
    const [profileQueryReference, loadProfile] = useQueryLoader(profileQuery);

    useEffect(() => {
        loadProfile({id: userid});
    }, [userid]);
    
    return (
        <Grid container spacing={2} marginTop={.5} sx={{height: '93vh'}}>
            <Grid item xs={4}>
                <Suspense fallback={<Fallback />}>
                    <Profile userid={userid} queryReference={profileQueryReference} />
                </Suspense>
            </Grid>
            <Grid item xs={4}>
                <Suspense fallback={<Fallback />}>
                    Profile
                </Suspense>
            </Grid>
            <Grid item xs={4}>
                <Suspense fallback={<Fallback />}>
                    Profile
                </Suspense>
            </Grid>
        </Grid>
    );
}