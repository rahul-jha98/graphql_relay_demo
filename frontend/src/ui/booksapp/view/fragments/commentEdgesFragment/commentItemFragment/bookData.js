import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { useStoreActions } from "../../../store";

export default ({ bookRef }) => {
    const book = useFragment(graphql`
        fragment bookDataFragment on Book {
            id
            name
        }
    `, bookRef);
    const [, { setSelectedBookId }] = useStoreActions();
    return (
        <Typography 
            variant="subtitle2" 
            component="div"
            onClick={() => setSelectedBookId(book.id)}
            sx={{fontSize: ".84rem", fontWeight: 600, cursor: "pointer"}} >
            - {book.name}
        </Typography> 
    );      
}