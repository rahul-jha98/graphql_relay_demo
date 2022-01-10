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
    Book: {
        // Resolver to populate author field in books
        author: (book, _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: book.author_id };
            }
            
            return userResolver.getUser({ user_id: book.author_id });
        },

        comments: (book, { user_id }, context) => {
            return commentResolver.getComments({ user_id, book_id: book.id });
        }
    },
    Author: {
        // Resolver to populate books field for an author
        books: (author) => bookResolver.getBooks({author_id: author.id})
    },
    NormalUser: {
        comments: (user) => commentResolver.getComments({ user_id: user.id })
    },
    Comment: {
        // Resolver to populate user field of a comment
        user: (comment, _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: comment.user_id };
            }
            return userResolver.getUser({ user_id: comment.user_id })
        },

        // Resolver to populate book field of a comment
        book: (comment,  _, context, info) => {
            if (isOnlyIdQueried(info, 'id')) {
                return { id: comment.book_id };
            }
            return bookResolver.getBook({ book_id: comment.book_id })
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

module.exports = resolvers;
