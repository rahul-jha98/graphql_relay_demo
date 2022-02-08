const DataLoader = require("dataloader");
const { groupBy, indexBy, map, prop } = require('ramda');
const userService = require("../service/user");
const bookService = require('../service/book');
const commentService = require('../service/comment');

const usersByIds = async (userIds) => {
    const users = await userService.usersWithIds(userIds);
    const usersMap = indexBy(prop('id'), users);
    return map((userId) => usersMap[userId] , userIds);
};

const booksByAuthor = async (author_ids) => {
    const books = await bookService.booksFromAuthors(author_ids);
    const booksGroupedByAuthorId = groupBy(prop('author_id'), books);
    return map((author_id) => booksGroupedByAuthorId[author_id], author_ids);
}

const booksByIds = async (book_ids) => {
    const books = await bookService.booksWithIds(book_ids);
    const booksById = indexBy(prop('id'), books);
    return map((book_id) => booksById[book_id], book_ids);
}

const commentsByBookIds = async (book_ids) => {
    const comments = await commentService.commentsForBookIds(book_ids);
    const commentsGroupedByBookId = groupBy(prop('book_id'), comments);
    return map((book_id) => commentsGroupedByBookId[book_id], book_ids);
}

const commentsByUserIds = async (user_ids) => {
    const comments = await commentService.commentsFromUserIds(user_ids);
    const commentsGroupedByUserId = groupBy(prop('user_id'), comments);
    return map((user_id) => commentsGroupedByUserId[user_id], user_ids);
}

const getDataLoaders = () => {
    console.log();
    console.log("Initializing data loaders");
    return {
        userDataLoader: new DataLoader(usersByIds), 
        
        booksByAuthorDataLoader: new DataLoader(booksByAuthor),
        bookDataLoader: new DataLoader(booksByIds),

        commentsByBookIdDataLoader: new DataLoader(commentsByBookIds),
        commentsByUserIdDataLoader: new DataLoader(commentsByUserIds)
    };
}

module.exports = getDataLoaders;