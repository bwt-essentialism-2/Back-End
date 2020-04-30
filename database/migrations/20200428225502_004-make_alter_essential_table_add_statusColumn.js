
exports.up = function(knex) {
  return knex.schema
    .table('Essentials', tbl => {
      tbl.boolean('essential_status')
        .notNullable()
        .defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.table('Essentials', tbl => {
    tbl.dropColumn('essential_status')
  })
};