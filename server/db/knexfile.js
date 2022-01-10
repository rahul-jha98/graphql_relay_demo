// Update with your config settings.
// Initialize migrations using 
// npx knex migrate:make init --migrations-directory db/migrations  

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'db',
      user:     'testuser',
      role: 'testuser',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
};
