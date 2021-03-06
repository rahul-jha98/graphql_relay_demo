import { lazy, Suspense, useEffect } from 'react';
import { usePreloadedQuery, graphql } from 'react-relay';
import ProfileDetails from './profiledetails';
import Fallback from '../fallback';
import { profileQuery } from './index';
import { useCurrentUserId } from '../store';
import BooksByUser from './BooksByUser';
import CommentsByUser from './CommentsByUser';


export default ({ userid, queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(profileQuery, queryReference);

    const user = data.user ?? {};

    const [currentUserId, { setUserType }] = useCurrentUserId();

    useEffect(() => {
        if (userid === currentUserId) {
            setUserType(user?.__typename);
        }
    }, [user,  currentUserId])
    

    return user && (<div>
        
        <ProfileDetails user={user} />
        <Suspense fallback={<Fallback />}>
            {user.__typename === 'Author' ? 
                <BooksByUser authorId={userid} /> :
                <CommentsByUser userId={userid} />
            }
        </Suspense>
    </div>);
}