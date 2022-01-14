import { lazy, Suspense,  useEffect } from 'react';
import { useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
import { useSelectedUserId } from '../store';
const Profile = lazy(() => import('./main'));

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

    useEffect(() => {
        loadProfile({id: selectedUserID });
    }, [selectedUserID]);
    
    return (
        <Suspense fallback={<Fallback />}>
            {profileQueryReference && <Profile userid={selectedUserID} queryReference={profileQueryReference} />}
        </Suspense>
    );
}