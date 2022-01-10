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
}

module.exports = new CommentDAO();