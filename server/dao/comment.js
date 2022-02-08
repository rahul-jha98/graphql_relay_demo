const db = require('../db');

class CommentDAO {
    fetchComments = (user_id, book_id) => {
        return db('comment')
            .modify((queryBuilder) => {
                if (user_id && user_id !== '') {
                    queryBuilder.where({ user_id });
                }
            })
            .modify((queryBuilder) => {
                if (book_id && book_id !== '') {
                    queryBuilder.where({ book_id });
                }
            })
            .select('*');
    }

    fetchCommentWithId = (commentId) => {
        return db('comment')
            .where({
                id: commentId
            })
            .select('*');
    }

    fetchAllCommentsFromUserIds = (user_ids) => {
        return db('comment')
            .whereIn('user_id', user_ids)
            .select('*');
    }

    fetchAllCommentsForBookIds = (book_ids) => {
        return db('comment')
            .whereIn('book_id', book_ids)
            .select('*');
    }

    deleteAllCommentsForBook = (book_id) => {
        return db('comment')
            .del()
            .where({book_id});
    }

    insertComment = (user_id, book_id, message) => {
        return db('comment')
            .insert({
                book_id,
                user_id,
                message
            })
            .returning('*');
    }

    deleteComment = (id) => {
        return db('comment')
            .del()
            .where({id});
    }
}

module.exports = new CommentDAO();