import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';

export default ({ authorRef }) => {
    const author = useFragment(graphql`
        fragment authorNameFragment on Author {
            id
            name
        }
    `, authorRef);

    return (
        <Typography variant="body2">
            {author.name}
        </Typography> 
    );      
}