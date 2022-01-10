const bookDAO = require('../dao/book');
const commentDAO = require('../dao/comment');
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

    addBook = async (name, year, isbn, author_id) => {
        const [book] = await bookDAO.insertBook(name, year, isbn, author_id);
        return book;
    }

    deleteBook = async (id) => {
        await commentDAO.deleteAllCommentsForBook(id);
        const rowsDeleted = await bookDAO.deleteBook(id);
        return rowsDeleted === 1;
    };
}

module.exports = new BookService();