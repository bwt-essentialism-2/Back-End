
exports.seed = function(knex) {
  return knex('Essentials').del()
    .then(function () {
      return knex('Essentials').insert([
        {
          name: 'Enroll in Lambdaschool',
          description: 'Get accepted into lambdaschools full stack developer for fulltime',
          user_id: 1,
          project_id: 1
        },
        {
          name: 'Research video recording gear',
          description: 'need to buy a webcam and mic to be a good youtuber',
          user_id: 1,
          project_id: 3
        },
      ]);
    });
};
