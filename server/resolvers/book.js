const bookService = require('../service/book');
const ConnectionHandler = require('./connectionhandler');
class BookResolver {
    constructor() {
        this.connectionHandler = ConnectionHandler.withStartText('book');
    }
    getBook = async ({ book_id }) => bookService.getBookWithId(book_id);

    getBooks = async ({ author_id }) => {
        if (author_id)
            return bookService.getAllBooksFromAuthor(author_id);
        else 
            return bookService.getAllBooks();
    }

    getPaginatedBooks = async ({ author_id, ...paginationProps }, maxPageSize = 20) => {
        const { pageSize, offset } = this.connectionHandler.getPaginationProps(paginationProps, maxPageSize);
        let books = []
        console.log(pageSize, offset);  
        if (author_id)
            books = await bookService.getAllBooksFromAuthor(author_id, { pageSize: pageSize + 1, offset: offset + 1 });
        else 
            books = await bookService.getAllBooks({ pageSize: pageSize + 1, offset: offset + 1 });

        return this.connectionHandler.getPaginatedList(books, offset + 1, pageSize);
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