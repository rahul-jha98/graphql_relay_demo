import { graphql, useFragment } from "react-relay";
import BooksListFragment from '../../fragments/booksConnectionFragment';


export default ({ user }) => {
    const data = useFragment(graphql`
        fragment BooksByUserFragment on User {
            ...on Author {
                books {
                    ...booksConnectionFragment @arguments(fetchAuthorName: false)
                }
            }
        }
    `, user);

    return <>
        Your Books
        <BooksListFragment bookConnectionRef={data.books} showAuthorName={false}/>
    </>
}