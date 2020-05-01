const server = require('../server');
const request = require('supertest');
const knexFile = require('../../knexfile').testing;
const knex = require('knex')(knexFile);
const db = require('../../database/dbConfig');
const knexCleaner = require('knex-cleaner');

beforeAll(async () => {
	await knexCleaner.clean(knex, {
		mode: 'truncate',
		restartIdentity: true,
		ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
	});
	await knex.seed.run();
});

describe('/auth', () => {
	describe('/register', () => {
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
		test('should return a valid register attempt', async () => {
			const user = { username: 'Sanders', password: 'password' };
			await request(server)
				.post('/api/auth/register')
				.send(user)
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
	});

	describe('/login', () => {
		const user = { username: 'Test', password: 'Test' };
		test('should login user', async () => {
			await request('server').post('/api/auth/login').send(user);
			expect(res.status).toBe(200);
		});
	});
});
