
exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
      tbl.increments().primary();

      tbl
        .string('username', 255)
        .notNullable()
        .unique()
        .index();
      tbl.string('password', 255).notNullable();
    })

 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users');
};
