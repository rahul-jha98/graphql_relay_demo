const db = require('../db');

class BookDAO {
    fetchBookWithId = (bookId) => {
        return db('book')
            .where({
                id: bookId
            })
            .select('*');
    }

    fetchAllBooks = () => {
        return db('book')
            .select('*');
    }

    fetchAllBooksFromAuthor = (author_id) => {
        return db('book')
            .where({author_id})
            .select('*');
    }

    fetchBooksFromAuthors = (author_ids) => {
        return db('book')
            .whereIn('author_id', author_ids)
            .select('*');
    }

    fetchBooksWithIds = (book_ids) => {
        return db('book')
            .whereIn('id', book_ids)
            .select('*');
    }
}

module.exports = new BookDAO();