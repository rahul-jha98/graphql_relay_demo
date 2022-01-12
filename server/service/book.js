const bookDAO = require('../dao/book');
const commentDAO = require('../dao/comment');
class BookService {
    prefix = 'book:'
    sanitizeId = (bookId) => bookId.slice(this.prefix.length)

    getBookWithId = async (bookId) => {
        const [book] = await bookDAO.fetchBookWithId(this.sanitizeId(bookId));
        if (!book) {
            throw new Error(`Book with id ${bookId} does not exist`);
        }
        return book;
    }

    getAllBooks = async (paginatedProps) => {
        return bookDAO.fetchAllBooks(paginatedProps);
    }

    getAllBooksFromAuthor = async (author_id, paginatedProps) => {
        return bookDAO.fetchAllBooksFromAuthor(author_id, paginatedProps);
    }

    booksFromAuthors = async (author_ids, pageSize) => bookDAO.fetchBooksFromAuthors(author_ids, pageSize);

    booksWithIds = async (book_ids) => bookDAO.fetchBooksWithIds(book_ids.map((book_id) => this.sanitizeId(book_id)));

    addBook = async (name, description, year, isbn, author_id) => {
        const [book] = await bookDAO.insertBook(name, description, year, isbn, author_id);
        return book;
    }

    deleteBook = async (id) => {
        const bookId = this.sanitizeId(id);
        await commentDAO.deleteAllCommentsForBook(bookId);
        const rowsDeleted = await bookDAO.deleteBook(bookId);
        return rowsDeleted === 1;
    };
}

module.exports = new BookService();