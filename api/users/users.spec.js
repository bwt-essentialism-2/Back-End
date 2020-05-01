const server = require('../server');
const request = require('supertest');
const knexFile = require('../../knexfile').testing;
const knex = require('knex')(knexFile);
const db = require('../../database/dbConfig');
const knexCleaner = require('knex-cleaner');

const cleanPerTest = async () => {
	await beforeEach(async () => {
		await knexCleaner.clean(knex, {
			mode: 'truncate',
			restartIdentity: true,
			ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
		});
	});
};

describe('Projects', () => {
	let testUser = null;
	const user = { username: 'Timmy', password: 'password' };
	beforeAll(async () => {
		knex.seed.run();
		await request(server)
			.post('/api/auth/login')
			.send(user)
			.then(res => {
				console.log(res.body);
				testUser = res.body;
			});
	});

	test('should find a users auth token', async () => {
		await request(server)
			.get('/api/users/projects')
			.set({ Authorization: testUser.token })
			.then(res => {
				expect(res.status).toBe(200);
				expect(res.body).toHaveLength(3);
			});
	});
});
