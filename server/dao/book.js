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
}

module.exports = new BookDAO();