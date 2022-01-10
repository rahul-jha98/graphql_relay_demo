const userDAO = require('../dao/user');

class UserService {
    validateUser = async (username, password) => {
        const selectedRow = await userDAO.fetchUserWith(username, password);
        return selectedRow.length > 0;
    }

    getUser = async (username) => {
        const [user] = await userDAO.fetchUser(username);
        if (!user) {
            throw new Error('Could not fetch author details');
        }
        return user;
    }

    getAllUsers = async (searchTerm, authorOnly) => userDAO.fetchAllUsers(searchTerm, authorOnly);

    usersWithIds = async (userIds) => userDAO.fetchUsersWithIds(userIds);

    addUser = async (user_id, password, name, is_author) => {
        const [user] = await userDAO.insertUser(user_id, password, name, is_author);
        console.log(user.created_at);
        return user;
    };

    removeUser = async (user_id) => {
        const rowsDeleted = await userDAO.deleteUser(user_id);
        return rowsDeleted === 1;
    }
}

module.exports = new UserService();