const commentDAO = require('../dao/comment');

class CommentService {
    prefix = 'comment:'
    sanitizeId = (commentId) => commentId.slice(this.prefix.length)
    sanitizeBookId = (id) => {
        if (!id) return id;

        if (id.startsWith('book:')) {
            return id.slice('book:'.length);
        }
        return id;
    }
    getComments = async (user_id, book_id, paginatedProps) => commentDAO.fetchComments(user_id, this.sanitizeBookId(book_id), paginatedProps);

    commentsFromUserIds = async (user_ids, pageSize) => commentDAO.fetchAllCommentsFromUserIds(user_ids, pageSize);

    commentsForBookIds = async (book_ids, pageSize) => commentDAO.fetchAllCommentsForBookIds(book_ids, pageSize);

    addComment = async (user_id, book_id, message) => {
        const [comment] = await commentDAO.insertComment(user_id, this.sanitizeBookId(book_id), message);
        return comment;
    }

    deleteComment = async (id) => {
        const [deletedCommentId] = await commentDAO.deleteComment(this.sanitizeId(id));
        return deletedCommentId;
    };
}

module.exports = new CommentService();