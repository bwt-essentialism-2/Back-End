
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'david', password: 'abc123'},
        {id: 2, username: 'tim', password: 'cat_lover'},
        {id: 3, username: 'rudy', password: '123456'}
      ]);
    });
};
