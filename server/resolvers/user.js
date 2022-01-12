const userService = require('../service/user');
const ConnectionHandler = require('./connectionhandler');

class UserResolver {
    constructor() {
        this.connectionHandler = ConnectionHandler.withStartText('user');
    }

    validateUser = async ({ id, password}) => userService.validateUser(id, password);

    getUser = async ({id}) => userService.getUser(id);

    getPaginatedUsers = async ({ searchTerm, authorOnly, ...paginationProps }, maxPageSize = 10) => {
        
        const { pageSize, offset } = this.connectionHandler.getPaginationProps(paginationProps, maxPageSize);

        const users = await userService.getUsers(searchTerm, authorOnly, { pageSize: pageSize + 1, offset: offset + 1 });

        return this.connectionHandler.getPaginatedList(users, offset + 1, pageSize);
    }

    addUser = async ({id, password, name, is_author}) => {
        try {
            const user = await userService.addUser(id, password, name, is_author);
            return { success: true, user };
        }
        catch (err) {
            return { success: false, messages: [err.message] }
        }
    }

    removeUser = async ({id}) => {
        try {
            const isDeleteSuccessful = await userService.removeUser(id);
            return { success: isDeleteSuccessful, messages: isDeleteSuccessful ? [] : ['User with given id does not exist'] };
        }
        catch (err) {
            return { success: false, mesasges: [err.message] }
        }
        
    }
};

 module.exports = new UserResolver();