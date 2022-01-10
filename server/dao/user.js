const db = require('../db');

class UserDAO {
    fetchUserWith = (username, password) => {
        return db('myuser')
            .where({
                id: username, 
                password
            })
            .select('username');
    }

    fetchUser = (username) => {
        return db('myuser')
            .where({id: username})
            .select('*');
    }

    fetchAllUsers = (searchTerm, authorOnly) => {
        return db('myuser')
            .modify((queryBuilder) => {
                if (searchTerm && searchTerm !== '') {
                    const searchTermInLowerCase = searchTerm.toLowerCase();
                    queryBuilder.whereRaw(`lower(name) like '%${searchTermInLowerCase}%'`);
                }
            })
            .modify((queryBuilder) => {
                if (authorOnly) {
                    queryBuilder.where({is_author: true})
                }
            })
            .select('*');
    }
}

module.exports = new UserDAO();