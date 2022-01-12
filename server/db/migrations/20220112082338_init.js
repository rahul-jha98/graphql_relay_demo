
exports.up = function(knex) {
    return knex.schema
        .alterTable('book', table => {
            table.string('description').notNullable().defaultTo('');
        })
};

exports.down = function(knex) {
  
};
