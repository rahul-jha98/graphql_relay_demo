const db = require('../db');

class CommentDAO {
    fetchComments = (user_id, book_id, {pageSize, endcursor} = {}) => {
        return db('comment')
            .modify((queryBuilder) => {
                if (user_id && user_id !== '') {
                    queryBuilder.where({ user_id });
                }
                if (book_id && book_id !== '') {
                    queryBuilder.where({ book_id });
                }
                if (pageSize) {
                    queryBuilder.limit(pageSize);
                }
                if (endcursor) {
                    queryBuilder.where('created_at', '<', new Date(endcursor).toISOString());
                }
            })
            .orderBy('created_at', "desc")
            .select('*');
    }

    fetchAllCommentsFromUserIds = (user_ids, pageSize) => {
        const innerQuery = db.from('comment')
                .whereIn('user_id', user_ids).toString();

        const tableNamePosition = innerQuery.search('comment');
        const subquery = innerQuery.slice(tableNamePosition-1);
        return db.select(db.raw(
            `ranked_comment.* FROM (SELECT "comment".*, row_number() OVER (PARTITION BY user_id ORDER BY created_at DESC) 
            FROM ?) ranked_comment WHERE row_number <= ?`, [db.raw(subquery), pageSize]));
    }

    fetchAllCommentsForBookIds = (book_ids, pageSize, endcursor) => {
        const innerQuery = db.from('comment')
                .whereIn('book_id', book_ids)
                .modify((queryBuilder) => {
                    if (endcursor) {
                        queryBuilder.where('created_at', '<', new Date(endcursor).toISOString());
                    }
                }).toString();

        const tableNamePosition = innerQuery.search('comment');
        const subquery = innerQuery.slice(tableNamePosition - 1);
        return db.select(db.raw(
            `ranked_comment.* FROM (SELECT "comment".*, row_number() OVER (PARTITION BY book_id ORDER BY created_at DESC) 
            FROM ?) ranked_comment WHERE row_number <= ?`, [db.raw(subquery), pageSize]));
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
            .where({id})
            .returning('id');
    }
}

module.exports = new CommentDAO();