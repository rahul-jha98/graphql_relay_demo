const bookService = require('../service/book');
const ConnectionHandler = require('./connectionhandler');
class BookResolver {
    constructor() {
        this.connectionHandler = ConnectionHandler.withStartText('book');
    }
    getBook = async ({ id }) => bookService.getBookWithId(id);

    getBooks = async ({ author_id }) => {
        if (author_id)
            return bookService.getAllBooksFromAuthor(author_id);
        else 
            return bookService.getAllBooks();
    }

    getPaginatedBooks = async ({ author_id, ...paginationProps }, maxPageSize = 20) => {
        const { pageSize, offset } = this.connectionHandler.getPaginationProps(paginationProps, maxPageSize);
        let books = []
        if (author_id)
            books = await bookService.getAllBooksFromAuthor(author_id, { pageSize: pageSize + 1, offset: offset + 1 });
        else 
            books = await bookService.getAllBooks({ pageSize: pageSize + 1, offset: offset + 1 });

        return this.connectionHandler.getPaginatedList(books, offset + 1, pageSize);
    }

    addBook = async ({name, year, isbn, author, description }) => {
        const book = await bookService.addBook(name, description, year, isbn, author);
        return { success: true, book };
    }

    updateBook = async ({ id, input }) => {
        try {
            const book = await bookService.updateBook(id, input);
            return { success: true, book };
        } catch (err) {
            return { success: false, messages: [err.message]}
        }
        
    }

    removeBook = async ({id}) => {
        try {
            const isDeleteSuccessful = await bookService.deleteBook(id);
            if (isDeleteSuccessful) {
                return { success: true, deletedBookId: id }
            }
            throw new Error(`Could not delete book`);
        }
        catch (err) {
            return { success: false, messages: [err.message] }
        }
    }
};

 module.exports = new BookResolver();