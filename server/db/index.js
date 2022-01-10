const knex = require('knex');
const knexfile = require('./knexfile');

var env = process.env.NODE_ENV || 'development';

const db = knex(env === 'development' ? knexfile.development : knexfile.production);

if (env === 'development') {
    db.on('query', (data) => {
        console.log();
        console.log(data.sql, data.bindings);
    });
}

module.exports = db;