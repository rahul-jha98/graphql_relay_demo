import { lazy, Suspense,  useEffect, useState } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
import { useSelectedUserId } from '../store';
const Profile = lazy(() => import('./main'));
import Header from './header';

export const profileQuery = graphql`
     query profileDetailsQuery($id: ID!) {
         user(id: $id) {
             __typename
            ...profiledetailsFragment
         }
     }
`;

export default () => {
    const [profileQueryReference, loadProfile] = useQueryLoader(profileQuery);
    const [selectedUserID] = useSelectedUserId();

    const [userId, setUserId] = useState(selectedUserID);

    useEffect(() => {
        loadProfile({id: selectedUserID });
        setUserId(selectedUserID);
    }, [selectedUserID]);
    
    return (<>
        <Header />
        <Suspense fallback={<Fallback />}>
            {profileQueryReference && <Profile userid={userId} queryReference={profileQueryReference} />}
        </Suspense>
    </>);
}