const userDAO = require('../dao/user');
class UserService {
    validateUser = async (username, password) => {
        const selectedRow = await userDAO.fetchUserWith(username, password);
        return selectedRow.length > 0;
    }

    getUser = async (username) => {
        const [user] = await userDAO.fetchUser(username);
        if (!user) {
            throw new Error(`Could not fetch author details for ${user}`);
        }
        return user;
    }

    getUsers = async (searchTerm, authorOnly, paginatedProps) => userDAO.fetchAllUsers(searchTerm, authorOnly, paginatedProps);

    usersWithIds = async (userIds) => userDAO.fetchUsersWithIds(userIds);

    addUser = async (user_id, password, name, is_author) => {
        const [user] = await userDAO.insertUser(user_id, password, name, is_author);
        return user;
    };

    removeUser = async (user_id) => {
        const rowsDeleted = await userDAO.deleteUser(user_id);
        return rowsDeleted === 1;
    }
}

module.exports = new UserService();