
exports.up = function(knex) {
    return knex.schema
    .createTable('Values', tbl => {
        tbl.increments();
        tbl.integer('value_id')
        .notNullable()
        .references('id')
        .inTable('Users');
        tbl.string('value')
            .notNullable()
            .unique();
        tbl.string('description');
      })
      .createTable('User_Values', tbl => {
        tbl.increments();
        tbl.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('Users');
        tbl.integer('value_id')
            .notNullable()
            .references('value_id')
            .inTable('Values');
        
      })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Values')
        .dropTableIfExists('User_Values');
};
