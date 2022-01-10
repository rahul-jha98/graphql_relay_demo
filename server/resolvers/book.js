const bookService = require('../service/book');

class BookResolver {
    getBook = async ({ book_id }) => bookService.getBookWithId(book_id);

    getBooks = async ({ author_id }) => {
        if (author_id) {
            return bookService.getAllBooksFromAuthor(author_id);
        } else {
            return bookService.getAllBooks();
        }
    }
};

 module.exports = new BookResolver();