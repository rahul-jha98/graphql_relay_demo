import { usePreloadedQuery, graphql } from 'react-relay';
import ProfileDetails from './profiledetails';
import BooksByUser from './BooksByUser';
export const profileQuery = graphql`
     query profileQuery($id: ID!) {
         user(id: $id) {
             __typename
            ...profiledetailsFragment
            ...BooksByUserFragment
         }
     }
`;

export default ({ userid, queryReference }) => {
    if (!queryReference) return null;
    const data = usePreloadedQuery(profileQuery, queryReference);

    const user = data.user ?? {};

    return user && (<div>
        <ProfileDetails user={user} />
        {user.__typename === 'Author' ? 
            <BooksByUser user={user} /> :
            <CommentsByUser user={user} />
        }
    </div>);
}