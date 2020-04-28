
exports.seed = function(knex) {
  return knex('User_Projects').del()
    .then(function () {
      return knex('User_Projects').insert([
        {
          user_id: 1,
          project_id: 1
        },
        {
          user_id: 1,
          project_id: 2
        },
        {
          user_id: 1,
          project_id: 3
        },
      ]);
    });
};
