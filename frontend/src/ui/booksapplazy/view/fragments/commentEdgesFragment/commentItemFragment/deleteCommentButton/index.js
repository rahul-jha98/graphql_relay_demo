import { graphql, useFragment } from "react-relay";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCurrentUserId,  useUserType } from "../../../../store";
import DeleteCommentMutationWrapper from "./deleteCommentMutationWrapper";



export default ({ commentRef }) => {
    const comment = useFragment(graphql`
        fragment deleteCommentButton2Fragment on Comment {
            id
            user {
                id
            }
        }
    `, commentRef);

    const [currentUserId] = useCurrentUserId();
    const [userType] = useUserType();
        
    if (userType === 'Author' || currentUserId !== comment.user?.id) {
        return null;
    }
    return (
        <DeleteCommentMutationWrapper>
            {(deleteComment) => (
                <IconButton size="small" sx={{float: 'right'}} onClick={() => deleteComment(comment.id)}>
                    <DeleteIcon sx={{ fontSize: 16 }}/>
                </IconButton>
            )}
        </DeleteCommentMutationWrapper>
        
    );      
}