const commentDAO = require('../dao/comment');

class CommentService {
    prefix = 'comment:'
    sanitizeId = (commentId) => commentId.slice(this.prefix.length)

    getComments = async (user_id, book_id, paginatedProps) => commentDAO.fetchComments(user_id, book_id, paginatedProps);

    commentsFromUserIds = async (user_ids, pageSize) => commentDAO.fetchAllCommentsFromUserIds(user_ids, pageSize);

    commentsForBookIds = async (book_ids, pageSize) => commentDAO.fetchAllCommentsForBookIds(book_ids, pageSize);

    addComment = async (user_id, book_id, message) => {
        const [comment] = await commentDAO.insertComment(user_id, book_id, message);
        return comment;
    }

    removeComment = async (id) => {
        const rowsDeleted = await commentDAO.deleteComment(this.sanitizeId(id));
        return rowsDeleted === 1;
    };
}

module.exports = new CommentService();