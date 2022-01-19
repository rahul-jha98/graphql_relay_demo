import { useStoreActions } from "../../../store";
import { graphql, useFragment } from "react-relay";
import Typography from "@mui/material/Typography";

export default ({ bookNodeRef }) => {
    const book = useFragment(graphql`
        fragment authorDetails2Fragment on Book
        {
            author {
                id
                name
            }
        }
    `, bookNodeRef);

    const [, { setSelectedUserId } ] = useStoreActions();
    return <Typography 
        variant="subtitle1" 
        onClick={() => setSelectedUserId(book.author?.id)}
        sx={{fontWeight: 600, cursor: "pointer"}}>
            by {book.author.name}
    </Typography>
}