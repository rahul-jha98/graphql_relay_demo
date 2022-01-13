import { lazy, Suspense, useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
import { profileQuery } from './main';
const Profile = lazy(() => import('./main'));


export default ({ userid }) => {
    const [profileQueryReference, loadProfile] = useQueryLoader(profileQuery);
    const [selectedUserID, setSelectedUserID] = useState(userid);

    useEffect(() => {
        loadProfile({id: selectedUserID});
    }, [selectedUserID]);
    
    return (
        <Suspense fallback={<Fallback />}>
            <Profile userid={userid} queryReference={profileQueryReference} />
        </Suspense>
    );
}