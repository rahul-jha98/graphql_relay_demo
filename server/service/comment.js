const commentDAO = require('../dao/comment');

class CommentService {
    getComments = async (user_id, book_id) => {
        return commentDAO.fetchComments(user_id, book_id);
    }

    commentsFromUserIds = async (user_ids) => commentDAO.fetchAllCommentsFromUserIds(user_ids);

    commentsForBookIds = async (book_ids) => commentDAO.fetchAllCommentsForBookIds(book_ids);
}

module.exports = new CommentService();