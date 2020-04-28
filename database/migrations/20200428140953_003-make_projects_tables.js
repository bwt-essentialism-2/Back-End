
exports.up = function(knex) {
  return knex.schema
    .createTable('Projects', tbl => {
      tbl.increments('id').primary();
      tbl.string('name', 128).notNullable().index();
      tbl.text('description');
      tbl.boolean('project_status').notNullable().defaultTo(false)
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('Users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
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

    .createTable('Essential_Values', tbl => {
      tbl.increments('id').primary();
      tbl.integer('essential_id', 128).notNullable()
      .unsigned()
      .notNullable()
      .references('Essentials.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('value_id')
      .unsigned()
      .notNullable()
      .references('Values.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Essential_Values')
    .dropTableIfExists('Essentials')
    .dropTableIfExists('User_Projects')
    .dropTableIfExists('Projects')
};
