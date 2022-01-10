const userService = require('../service/user');
class UserResolver {
    validateUser = async ({ user_id, password}) => userService.validateUser(user_id, password);

    getUser = async ({user_id}) => userService.getUser(user_id);

    getAllUsers = async ({ searchTerm, authorOnly }) => userService.getAllUsers(searchTerm, authorOnly);

    addUser = async ({user_id, password, name, is_author}) => userService.addUser(user_id, password, name, is_author);

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