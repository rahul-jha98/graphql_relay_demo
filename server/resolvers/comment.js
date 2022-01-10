const commentService = require('../service/comment');

class CommentResolver {
    getComments = async ({ user_id, book_id }) => commentService.getComments(user_id, book_id);

    addComment = async ({message, user_id, book_id}) => commentService.addComment(user_id, book_id, message);

    async = async ({id}) => {
        try {
            const isDeleteSuccessful = await commentService.deleteComment(id);
            return { success: isDeleteSuccessful, messages: isDeleteSuccessful ? [] : ['Comment with given id does not exist'] };
        }
        catch (err) {
            return { success: false, mesasges: [err.message] }
        }
    }
};

 module.exports = new CommentResolver();