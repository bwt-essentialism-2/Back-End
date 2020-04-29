const server = require('../server');
const request = require('supertest');
const db = require('../../database/dbConfig');

describe('/auth', () => {
	describe('/register', () => {
    // beforeEach(async () => {
    //   await db('Users').truncate(); // empty table and reset ids
    // });

		test('should return a invalid register attempt', () => {
			return request(server)
        .post('/api/auth/register')
        .send({ username: 'a', password: '123' })
				.then(res => {
					expect(res.status).toBe(401);
					expect(res.body.errorMessage).toBe(`Invalid attempt. username must contain atleast 3 characters & password must be more then 5`);
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
