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

const isOnlyIdQueried = (info, idFieldValue) => {
    return info.fieldNodes.every(({ selectionSet: { selections } }) => {
        if (selections.length === 1 && selections[0].name.value === idFieldValue) {
            return true;
        }
        return false;
    });
}

const queryResolvers = {
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
    Book: {
        // Resolver to populate author field in books
        author: (book, _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: book.author_id };
            }
            const { dataLoaders } = context;
            const { userDataLoader } = dataLoaders;
            return userDataLoader.load(book.author_id);
            // return userResolver.getUser({ user_id: book.author_id });
        },

        comments: (book, { user_id }, context) => {
            if (user_id) {
                return commentResolver.getComments({ user_id, book_id: book.id });
            }
            else {
                const { dataLoaders } = context;
                const { commentsByBookIdDataLoader } = dataLoaders;
                return commentsByBookIdDataLoader.load(book.id);
            }
        }
    },
    Author: {
        // Resolver to populate books field for an author
        books: (author, _, context) => {
            const { dataLoaders } = context;
            const { booksByAuthorDataLoader } = dataLoaders;
            return booksByAuthorDataLoader.load(author.id);
            // return bookResolver.getBooks({author_id: author.id});
        }
    },
    NormalUser: {
        comments: (user, _, context) =>  {
            const { dataLoaders } = context;
            const { commentsByUserIdDataLoader } = dataLoaders;
            return commentsByUserIdDataLoader.load(user.id);
            // commentResolver.getComments({ user_id: user.id });
        }
    },
    Comment: {
        timestamp: (comment) => comment.created_at,
        // Resolver to populate user field of a comment
        user: (comment, _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: comment.user_id };
            }
            const { dataLoaders } = context;
            const { userDataLoader } = dataLoaders;
            return userDataLoader.load(comment.user_id);
            // return userResolver.getUser({ user_id: comment.user_id })
        },

        // Resolver to populate book field of a comment
        book: (comment,  _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: comment.book_id };
            }
            const { dataLoaders } = context;
            const { bookDataLoader } = dataLoaders;
            return bookDataLoader.load(comment.book_id);
            // return bookResolver.getBook({ book_id: comment.book_id })
        },
    },
    User: {
        __resolveType: (obj) => {
            if (obj.is_author) {
                return 'Author';
            }
            return 'NormalUser';
        } 
    },
};

const mutationResolvers = {
    Mutation: {
        addUser: (_, args) => userResolver.addUser(args),
        removeUser: (_, args) => userResolver.removeUser(args),

        addBook: (_, args) => bookResolver.addBook(args),
        removeBook: (_, args) => bookResolver.removeBook(args), 

        addComment: (_, args) => commentResolver.addComment(args),
        removeComment: (_, args) => commentResolver.removeBook(args),
    }
}

module.exports = { ...queryResolvers, ...mutationResolvers };
