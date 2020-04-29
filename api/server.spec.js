const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('Server', () => {
	describe('/', () => {
		test('should return status 200 OK', () => {
			return request(server)
				.get('/')
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
		test('should return server statuts is live', () => {
			return request(server)
				.get('/')
				.then(res => {
					expect(res.body.message).toBe('Server is Live');
				});
		});
	});
});
