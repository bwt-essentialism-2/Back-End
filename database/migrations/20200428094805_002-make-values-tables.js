
exports.up = function(knex) {
  return knex.schema
    .createTable('Values', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable().index();
      tbl.text('description');
    })

    .createTable('User_Values', () => {
      tbl.increments('id').primary();
      tbl.string('value_id', 128).notNullable()
      .unsigned()
      .notNullable()
      .references('Users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('Values.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('User_Values')
    .dropTableIfExists('Values')
}