const userResolver = require('./user');
const bookResolver = require('./book');
const commentResolver = require('./comment');

const timerResolver = async (_, args) => {
    const { ms } = args;
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
    return ms;
}

const resolvers = {
    Query: {
        isOnline: () => true,
        timer: timerResolver,

        // Resolver for Users
        validateUser: (_, args) => userResolver.validateUser(args),
        users: (_, args) => userResolver.getAllUsers(args),
        user: (_, { user_id }) => userResolver.getUser({ user_id: user_id }),

        // Resolver for Book based queries
        books: (_, args) => bookResolver.getBooks(args),
        book: (_, args) => bookResolver.getBook(args),
        
        // Resolver for Comments related queries
        comments: (_, args) => commentResolver.getComments(args),
    },
};

module.exports = resolvers;
