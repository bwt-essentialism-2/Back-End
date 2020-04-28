
exports.up = function(knex) {
  return knex.schema
    .createTable('Projects', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable().index();
      tbl.text('description');
      tbl.boolean('project_status').notNullable().defaultTo(false)
    })

    .createTable('User_Projects', tbl => {
      tbl.increments('id').primary();
      tbl.integer('user_id', 128).notNullable()
      .unsigned()
      .notNullable()
      .references('Users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('Projects.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })

    .createTable('Essentials', tbl => { // aka glorified To-Do List
      tbl.increments('id').primary();
      tbl.string('name')
        .notNullable()
        .index()
      tbl.text('description')
      tbl.integer('user_id')
        .notNullable()
        .references('Users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('project_id')
        .notNullable()
        .references('Users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Essentials')
    .dropTableIfExists('User_Projects')
    .dropTableIfExists('Projects')
};
