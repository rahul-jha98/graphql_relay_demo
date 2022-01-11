const commentService = require('../service/comment');
const ConnectionHandler = require('./connectionhandler');
class CommentResolver {
    constructor() {
        this.connectionHandler = new ConnectionHandler(
            (_, comment) => Buffer.from(`${comment.created_at}`).toString('base64'),
            (cursor) => Buffer.from(cursor, 'base64').toString('ascii')
        )
    }
    getComments = async ({ user_id, book_id }) => commentService.getComments(user_id, book_id);

    addComment = async ({message, user_id, book_id}) => commentService.addComment(user_id, book_id, message);

    getPaginatedComments = async ({ user_id, book_id, ...paginationProps }, maxPageSize = 10) => {
        const { pageSize, offset } = this.connectionHandler.getPaginationProps(paginationProps, maxPageSize, null);

        const comments = await commentService.getComments(user_id, book_id, { pageSize: pageSize + 1, endcursor: offset });

        return this.connectionHandler.getPaginatedList(comments, 0, pageSize);
    }

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