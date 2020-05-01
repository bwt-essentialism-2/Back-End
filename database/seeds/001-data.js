const bcrypt = require('bcrypt');
const rounds = process.env.HASH_COUNT || 10

exports.seed = async function (knex) {
	return await knex('Users')
		.del()
		.then(function () {
			return knex('Users').insert([
				{
          username: 'Timmy',
          password: hasher('password')
        },
        {
          username: 'Test',
          password: hasher('Test')
        },
        {
          username: 'David',
          password: hasher('123456')
        },
			]);
		});
};

function hasher(password) {
  return bcrypt.hashSync(password, +rounds)
} 