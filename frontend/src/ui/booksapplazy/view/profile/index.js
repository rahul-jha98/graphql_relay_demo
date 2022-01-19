import { lazy, Suspense,  useEffect, useState } from 'react';
import { useLazyLoadQuery, useQueryLoader } from 'react-relay';
import Fallback from '../fallback';
import { useSelectedUserId } from '../store';
import Header from './header';
import { useCurrentUserId } from '../store';
import ProfileDetails from './profiledetails';

const BooksByUser = lazy(() => import('./BooksByUser'));
const CommentsByUser = lazy(() => import('./CommentsByUser'));

export const profileQuery = graphql`
     query profileDetails2Query($id: ID!) {
         user(id: $id) {
             __typename
            ...profiledetails2Fragment
         }
     }
`;

const Profile = () => {
    const [selectedUserID] = useSelectedUserId();
    const [currentUserId, { setUserType }] = useCurrentUserId();
    

    const data = useLazyLoadQuery(profileQuery, { id: selectedUserID});
    
    const user = data.user ?? {};
    

    useEffect(() => {
        if (selectedUserID === currentUserId) {
            setUserType(user?.__typename);
        }
    }, [user,  currentUserId, selectedUserID])
    

    return user && (<div className='scrollablecolumn'>
        <ProfileDetails user={user} />
        <Suspense fallback={<Fallback />}>
            {user.__typename === 'Author' ? 
                <BooksByUser authorId={selectedUserID} /> :
                <CommentsByUser userId={selectedUserID} />
            }
        </Suspense>
    </div>);
}

export default () => {
    return (<>
        <Header />
        <Suspense fallback={<Fallback />}>
            <Profile  />
        </Suspense>
    </>);
}