// Update with your config settings.
// Initialize migrations using 
// npx knex migrate:make init --migrations-directory db/migrations  

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'servercopy',
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
  },
  production: {
    client: 'postgresql',
    connection:  {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 15
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  }
};
