const userService = require('../service/user');
const ConnectionHandler = require('./connectionhandler');

class UserResolver {
    constructor() {
        this.connectionHandler = ConnectionHandler.withStartText('user');
    }

    validateUser = async ({ user_id, password}) => userService.validateUser(user_id, password);

    getUser = async ({user_id}) => userService.getUser(user_id);

    getPaginatedUsers = async ({ searchTerm, authorOnly, ...paginationProps }, maxPageSize = 10) => {
        
        const { pageSize, offset } = this.connectionHandler.getPaginationProps(paginationProps, maxPageSize);

        const users = await userService.getUsers(searchTerm, authorOnly, { pageSize: pageSize + 1, offset: offset + 1 });

        return this.connectionHandler.getPaginatedList(users, offset + 1, pageSize);
    }

    addUser = async ({user_id, password, name, is_author}) => {
        try {
            const user = await userService.addUser(user_id, password, name, is_author);
            return { success: true, user };
        }
        catch (err) {
            return { success: false, mesasges: [err.message] }
        }
    }

    removeUser = async ({user_id}) => {
        try {
            const isDeleteSuccessful = await userService.removeUser(user_id);
            return { success: isDeleteSuccessful, messages: isDeleteSuccessful ? [] : ['User with given id does not exist'] };
        }
        catch (err) {
            return { success: false, mesasges: [err.message] }
        }
        
    }
};

 module.exports = new UserResolver();