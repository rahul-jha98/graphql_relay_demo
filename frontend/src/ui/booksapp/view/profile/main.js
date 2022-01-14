import { lazy, Suspense } from 'react';
import { usePreloadedQuery, graphql } from 'react-relay';
import ProfileDetails from './profiledetails';
import Fallback from '../fallback';
import { profileQuery } from './index';

const BooksByUser = lazy(() => import('./BooksByUser'));
const CommentsByUser = lazy(() => import('./CommentsByUser'));



export default ({ userid, queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(profileQuery, queryReference);

    const user = data.user ?? {};

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