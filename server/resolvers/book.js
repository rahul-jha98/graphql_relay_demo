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

    addBook = ({name, year, isbn, author }) => bookService.addBook(name, year, isbn, author);

    removeBook = async ({id}) => {
        try {
            const isDeleteSuccessful = await bookService.deleteBook(id);
            return { success: isDeleteSuccessful, messages: isDeleteSuccessful ? [] : ['Book with given id does not exist'] };
        }
        catch (err) {
            return { success: false, mesasges: [err.message] }
        }
    }
};

 module.exports = new BookResolver();