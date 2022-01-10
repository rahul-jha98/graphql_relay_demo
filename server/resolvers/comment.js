const commentService = require('../service/comment');

class CommentResolver {
    getComments = async ({ user_id, book_id }) => commentService.getComments(user_id, book_id);
};

 module.exports = new CommentResolver();