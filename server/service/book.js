const bookDAO = require('../dao/book');

class BookService {
    getBookWithId = async (bookId) => {
        const [book] = await bookDAO.fetchBookWithId(bookId);
        if (!book) {
            throw new Error(`Book with id ${bookId} does not exist`);
        }
        return book;
    }

    getAllBooks = async () => {
        return bookDAO.fetchAllBooks();
    }

    getAllBooksFromAuthor = async (author_id) => {
        return bookDAO.fetchAllBooksFromAuthor(author_id);
    }

    booksFromAuthors = async (author_ids) => bookDAO.fetchBooksFromAuthors(author_ids);

    booksWithIds = async (book_ids) => bookDAO.fetchBooksWithIds(book_ids);
}

module.exports = new BookService();