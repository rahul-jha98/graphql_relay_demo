const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile);

db.on('query', (data) => {
    console.log();
    console.log(data.sql, data.bindings);
});

module.exports = db;