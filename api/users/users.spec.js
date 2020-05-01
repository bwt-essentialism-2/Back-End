const server = require('../server');
const request = require('supertest');
const knexFile = require('../../knexfile').testing;
const knex = require('knex')(knexFile);
const db = require('../../database/dbConfig');
const knexCleaner = require('knex-cleaner');

let testUser = {};
const user = { username: 'Timmy', password: 'password' };
beforeAll(async () => {
	await knexCleaner.clean(knex, {
		mode: 'truncate',
		restartIdentity: true,
		ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
	});
	await knex.seed.run();
	await request(server)
		.post('/api/auth/login')
		.send(user)
		.then(res => {
			testUser = res.body;
		});
});

describe('Users', () => {
	test('should find a users auth token', async () => {
		const user = { username: 'Timmy', password: 'password' };
		await request(server)
			.post('/api/auth/login')
			.send(user)
			.then(res => {
				expect(res.body.token).toBeDefined();
			});
	});

	describe('User Projects', () => {
		test('should return projects of user', async () => {
			const res = await request(server)
				.get('/api/users/projects')
				.set({ Authorization: testUser.token });
			expect(res.status).toBe(200);
			expect(res.body.length).toBeGreaterThan(1);
		});

		test('should Create a user project', async () => {
			await request(server)
				.post('/api/users/projects')
				.set({ Authorization: testUser.token })
				.send({
					name: 'Be a better tester then Kent C. Dotts',
					description: 'Create a testing library better then jest and cypress!!',
					project_status: false,
					user_id: 1,
				})
				.then(res => {
					expect(res.status).toBe(201);
				})
		});

		test('should Edit a user project', async () => {
			await request(server)
				.post('/api/users/projects/4')
				.set({ Authorization: testUser.token })
				.send({
					name: 'I was wrong hes too good',
					description: 'Reminder Project that ill be the best one day',
					project_status: true
				})
				.then(res => {
					expect(res.status).toBe(200);
					// const editedProj = await db('Projects').where({ name: 'I was wrong hes too good' })
					// expect(editedProj).toBeDefined()
				})
		});
	});

	describe('User Project Essentials', () => {
		test('should return essentials of a project', async () => {
			const res = await request(server)
				.get('/api/users/projects/1/essentials')
				.set({ Authorization: testUser.token });
			expect(res.status).toBe(200);
			// expect(res.body.length).toBeGreaterThan(1);
		});

		test('should Create a essentials', async () => {
			await request(server)
				.post('/api/users/projects/1/essentials')
				.set({ Authorization: testUser.token })
				.send({
					name: 'lets make test todo stuff!',
					description: 'desc are a waste of time',
					project_status: false,
				})
				.then(res => {
					expect(res.status).toBe(201);
				})
		});

		test('should Edit a essential', async () => {
			await request(server)
				.post('/api/users/projects/1/essentials')
				.set({ Authorization: testUser.token })
				.send({
					name: 'edit all my todos!',
					description: 'haha it changed',
					project_status: false,
					user_id: 1,
          project_id: 1
				})
				.then(res => {
					expect(res.status).toBe(201);
				})
		});
	});
});