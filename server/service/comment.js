const commentDAO = require('../dao/comment');

class CommentService {
    getComments = async (user_id, book_id) => {
        return commentDAO.fetchComments(user_id, book_id);
    }
}

module.exports = new CommentService();