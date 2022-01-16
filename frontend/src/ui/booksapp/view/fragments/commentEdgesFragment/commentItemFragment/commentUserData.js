import { graphql, useFragment } from "react-relay";
import Typography from '@mui/material/Typography';
import { useStoreActions } from "../../../store";

export default ({ userRef }) => {
    const user = useFragment(graphql`
        fragment commentUserDataFragment on User {
            id
            name
        }
    `, userRef);
    const [, { setSelectedUserId }] = useStoreActions();
    return (
        <Typography 
            variant="subtitle2" 
            component="div"
            onClick={() => setSelectedUserId(user.id)}
            sx={{fontSize: ".80rem", cursor: "pointer"}} >
            {user.name}
        </Typography> 
    );      
}