
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl  
            .integer('id')
            .primary()
            .notNullable();
        tbl.string("username");
        tbl.string("password");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
