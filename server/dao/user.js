const db = require('../db');

class UserDAO {
    fetchUserWith = (username, password) => {
        return db('myuser')
            .where({
                id: username, 
                password
            })
            .select('id');
    }

    fetchUser = (username) => {
        return db('myuser')
            .where({id: username})
            .select('*');
    }

    fetchAllUsers = (searchTerm, authorOnly, {pageSize, offset} = {}) => {
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
            .modify((queryBuilder) => {
                if (pageSize) {
                    queryBuilder.limit(pageSize);
                }
                if (offset) {
                    queryBuilder.offset(offset);
                }
            })
            .select('*');
    }

    fetchUsersWithIds = (userIds) => {
        return db('myuser')
            .whereIn('id', userIds)
            .select('*');
    }

    insertUser = (id, password, name, is_author) => {
        return db('myuser')
            .insert({
                id, 
                password,
                name,
                is_author
            })
            .returning('*');
    }

    deleteUser = (id) => {
        return db('myuser')
            .del()
            .where({
                id
            })
    }
}

module.exports = new UserDAO();