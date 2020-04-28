const server = require('./server.js');
const request = require('supertest');

describe('GET /', () => {
    it('checks if message is the same', () => {
        return request(server).get('/')
            .expect(200)
            .then(res => {
                expect(res.body.message).toBe('Server is Live')
            })
    })
});