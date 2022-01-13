const DataLoader = require("dataloader");
const { groupBy, indexBy, map, prop } = require('ramda');
const userService = require("../service/user");
const bookService = require('../service/book');
const commentService = require('../service/comment');
const ConnectionHandler = require('./connectionhandler');

const bookConnectionHandler = ConnectionHandler.withStartText('book');
const commentConnectionHandler = new ConnectionHandler(
    (_, comment) => Buffer.from(`${comment.created_at}`).toString('base64'),
    (cursor) => Buffer.from(cursor, 'base64').toString('ascii')
);

const usersByIds = async (userIds) => {
    const users = await userService.usersWithIds(userIds);
    const usersMap = indexBy(prop('id'), users);
    return map((userId) => usersMap[userId] , userIds);
};

const booksByAuthor = async (combined_author_ids) => {
    const clipPosition = combined_author_ids[0].search('-')
    const pageSize = parseInt(combined_author_ids[0].slice(0, clipPosition));

    const author_ids = combined_author_ids.map((combined_author_id) => combined_author_id.slice(clipPosition + 1));

    const books = await bookService.booksFromAuthors(author_ids, pageSize + 1);
    const booksGroupedByAuthorId = groupBy(prop('author_id'), books);      
    return map((author_id) => bookConnectionHandler.getPaginatedList(booksGroupedByAuthorId[author_id], 0, pageSize), author_ids);
}

const booksByIds = async (book_ids) => {
    const books = await bookService.booksWithIds(book_ids);
    const booksById = indexBy(prop('id'), books);
    return map((book_id) => booksById[book_id], book_ids);
}

const commentsByBookIds = async (combined_book_ids) => {
    const clipPosition = combined_book_ids[0].search('-')
    const pageSize = parseInt(combined_book_ids[0].slice(0, clipPosition));

    const book_ids = combined_book_ids.map((combined_book_id) => combined_book_id.slice(clipPosition + 1));

    const comments = await commentService.commentsForBookIds(book_ids, pageSize);

    const commentsGroupedByBookId = groupBy(prop('book_id'), comments);
    return map((book_id) => commentConnectionHandler.getPaginatedList(commentsGroupedByBookId[book_id], 0, pageSize), book_ids);
}

const commentsByUserIds = async (combined_user_ids) => {
    const clipPosition = combined_user_ids[0].search('-')
    const pageSize = parseInt(combined_user_ids[0].slice(0, clipPosition));

    const user_ids = combined_user_ids.map((combined_user_id) => combined_user_id.slice(clipPosition + 1));

    const comments = await commentService.commentsFromUserIds(user_ids, pageSize);

    const commentsGroupedByUserId = groupBy(prop('user_id'), comments);
    return map((user_id) => commentConnectionHandler.getPaginatedList(commentsGroupedByUserId[user_id], 0, pageSize), user_ids);
}

const getDataLoaders = () => {
    console.log("Initailizing dataloaders")
    return {
        userDataLoader: new DataLoader(usersByIds), 

        booksByAuthorDataLoader: new DataLoader(booksByAuthor),
        bookDataLoader: new DataLoader(booksByIds),

        commentsByBookIdDataLoader: new DataLoader(commentsByBookIds),
        commentsByUserIdDataLoader: new DataLoader(commentsByUserIds)
    };
}

module.exports = getDataLoaders;