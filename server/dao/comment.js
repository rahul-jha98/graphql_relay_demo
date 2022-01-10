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
}

module.exports = new CommentDAO();