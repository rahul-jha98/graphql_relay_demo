
exports.up = function(knex) {
    return knex.schema
      .createTable('myuser', table => {
          table.string('id').notNullable().primary();
          table.string('password').notNullable();
          table.string('name').notNullable();
          table.boolean('is_author').notNullable();
          table.timestamps(true, true);
      })
      .createTable('book', table => {
          table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
          table.string('name').notNullable().unique();
          table.integer('year');
          table.string('isbn');
          table.string('author_id')
              .index()
              .references('id')
              .inTable('myuser');
          table.timestamps(true, true);
      })
      .createTable('comment', table => {
          table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
          table.string('message').notNullable();
          table.string('user_id')
              .index()
              .references('id')
              .inTable('myuser');
          table.uuid('book_id')
              .index()
              .references('id')
              .inTable('book');
          table.timestamps(true, true);
          table.unique(['user_id', 'book_id']);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('comment')
      .dropTable('book')
      .dropTable('myuser');
  };
  