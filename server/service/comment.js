const commentDAO = require('../dao/comment');

class CommentService {
    getComments = async (user_id, book_id) => {
        return commentDAO.fetchComments(user_id, book_id);
    }

    commentsFromUserIds = async (user_ids) => commentDAO.fetchAllCommentsFromUserIds(user_ids);

    commentsForBookIds = async (book_ids) => commentDAO.fetchAllCommentsForBookIds(book_ids);

    addComment = async (user_id, book_id, message) => {
        const [comment] = await commentDAO.insertComment(user_id, book_id, message);
        return comment;
    }

    removeComment = async (id) => {
        const rowsDeleted = await commentDAO.deleteComment(id);
        return rowsDeleted === 1;
    };
}

module.exports = new CommentService();