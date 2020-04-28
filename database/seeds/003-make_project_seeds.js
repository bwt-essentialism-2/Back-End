
exports.seed = function(knex) {
  return knex('Projects').del()
    .then(function () {
      return knex('Projects').insert([
        {
          name: 'Become a Full Stack Developer',
          description: 'There would be nothing more pleasing then to fullfil my dream of becoming a software engineer',
          project_status: false,
          user_id: 1
        },
        {
          name: 'Get Hired at Google',
          description: 'The FANG dream, lets get hired at Google!',
          project_status: false,
          user_id: 1
        },
        {
          name: 'Youtube Channel on teaching coding',
          description: `I too want to be a youtuber, who doesn't?`,
          project_status: false,
          user_id: 1
        },
      ]);
    });
};
