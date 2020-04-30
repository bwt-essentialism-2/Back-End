process.env.DB_ENV = 'testing';
const server = require('../server');
const request = require('supertest');
const db = require('../../database/dbConfig')
const knex = require('knex');

describe('/auth', () => {
	describe('/register', () => {
		beforeEach(() => {
			knex(db['testing']).migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
		});

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
				.send({ username: 'Billy', password: 'password' })
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
	});
});