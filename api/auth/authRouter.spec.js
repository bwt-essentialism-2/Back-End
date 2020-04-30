const server = require('../server');
const request = require('supertest');
const knex = require('knex');
const knexFile = require('../../knexfile').testing;
const db = knex(knexFile);
const knexCleaner = require('knex-cleaner');

describe('/auth', () => {
	const testDB = () => {
		db.migrate.rollback()
			.then(() => db.migrate.latest())
			.then(() => {
				knexCleaner.clean(db, {
					ignoreTables: ['knex_migrations', 'knex_migrations_lock']
				});
			})
			// .then(() => db.seed.run());
	};

	describe('/register', () => {
		testDB();
		test('should return a invalid register attempt', () => {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'a', password: '123' })
				.then(res => {
					expect(res.status).toBe(401);
					expect(res.body.errorMessage).toBe(
						`Invalid attempt. username must contain atleast 3 characters & password must be more then 5`
					);
				});
		});
		test('should return a valid register attempt', () => {
			return request(server)
				.post('/api/auth/register')
				.send({ username: '2Billy', password: 'password' })
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
	});
});

// const knex = require('knex')({
// 	client: 'pg',
// 	connection: {
// 		host: process.env.DATABASE_URL || '127.0.0.1',
// 		user: process.env.DB_USER,
// 		password: process.env.DB_PASS,
// 		database: 'EssentialismTest'
// 	}
// });
