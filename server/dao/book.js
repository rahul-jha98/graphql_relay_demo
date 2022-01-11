const db = require('../db');

class BookDAO {
    fetchBookWithId = (bookId) => {
        return db('book')
            .where({
                id: bookId
            })
            .select('*');
    }

    fetchAllBooks = ({pageSize, offset} = {}) => {
        return db('book')
            .modify((queryBuilder) => {
                if (pageSize) {
                    queryBuilder.limit(pageSize);
                }
                if (offset) {
                    queryBuilder.offset(offset);
                }
            })
            .select('*');
    }

    fetchAllBooksFromAuthor = (author_id, { pageSize, offset } = {}) => {
        return db('book')
            .where({author_id})
            .modify((queryBuilder) => {
                if (pageSize) {
                    queryBuilder.limit(pageSize);
                }
                if (offset) {
                    queryBuilder.offset(offset);
                }
            })
            .select('*');
    }

    fetchBooksFromAuthors = (author_ids, pageSize) => {
        const innerQuery = db.from('book')
                .whereIn('author_id', author_ids).toString();
        const tableNamePosition = innerQuery.search('book');
        const subquery = innerQuery.slice(tableNamePosition-1);
        return db.select(db.raw(
            `ranked_book.* FROM (SELECT book.*, row_number() OVER (PARTITION BY author_id) 
             FROM ?) ranked_book WHERE row_number <= ?`, [db.raw(subquery), pageSize]));
    }

    fetchBooksWithIds = (book_ids) => {
        return db('book')
            .whereIn('id', book_ids)
            .select('*');
    }

    insertBook = (name, year, isbn, author_id) => {
        return db('book')
            .insert({
                name,
                year,
                isbn,
                author_id
            })
            .returning('*');
    }

    deleteBook = (id) => {
        return db('book')
            .del()
            .where({
                id
            });
    }
}

module.exports = new BookDAO();