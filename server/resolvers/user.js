const userService = require('../service/user');

class UserResolver {
    validateUser = async ({ user_id, password}) => userService.validateUser(user_id, password);

    getUser = async ({user_id}) => userService.getUser(user_id);

    getAllUsers = async ({ searchTerm, authorOnly }) => userService.getAllUsers(searchTerm, authorOnly);
};

 module.exports = new UserResolver();