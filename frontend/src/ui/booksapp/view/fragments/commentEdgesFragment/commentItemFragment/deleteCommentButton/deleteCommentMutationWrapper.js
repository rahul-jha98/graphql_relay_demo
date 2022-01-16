import { useMutation, graphql } from "react-relay";


const DeleteCommentMutation = graphql`
  mutation deleteCommentMutationWrapperMutation($id: ID!) 
    @raw_response_type {
    removeComment(id: $id) {
        success
        
        deletedCommentId @deleteRecord
    }
  }
`;

export default ({ children }) => {

    const [commitMutation, isInFlight] = useMutation(DeleteCommentMutation);

    const deleteComment = (commentId) => {
        commitMutation({
            variables: { id: commentId },
            optimisticResponse: {
                removeComment: {
                    success: true,

                    deletedCommentId: commentId
                }
            }
        });
    }

    return children(deleteComment, isInFlight);
}
