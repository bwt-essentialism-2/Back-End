
exports.seed = function(knex) {
  return knex('Essential_Values').del()
    .then(function () {
      return knex('Essential_Values').insert([
        /* User Timmy's FSD essentials related values */
        {
          essential_id: 1,
          value_id: 11
        },
        {
          essential_id: 1,
          value_id: 9
        },
        {
          essential_id: 1,
          value_id: 11
        },
      ]);
    });
};
