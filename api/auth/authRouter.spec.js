const server = require('../server.js');
const request = require('supertest');
const knex = require('../../database/dbConfig.js');//brought in database to delete repeating users being called
//req.body -> username/pass
//should return 201 status 
//should return user object in res.body
describe('should register user', () => {
    let response;//used to set real response to
    const user = {//user object to post in request
        username: "david",
        password: "abc123"
    }
    
    // beforeEach(() => {
    //     request(server)
    //         .post('/api/auth/register')
    //         .send(user)
    //         .then(res => {
    //             console.log("res------->", res)
    //             response = res;
    //         })
    //         .catch(err =>{
    //             console.error(err);
    //         })
    // })

    beforeEach(async () => {//had to use async/await in order to send request

        const _ = await knex('Users').where({username: user.username}).del()
        response = await request(server)
            .post('/api/auth/register')
            .send(user)
    })

    it('should match expected username value', () =>{
        console.log('----------->',response.body)
        expect(response.body.addedUser.username).toBe(user.username)
    })
    it.todo('check status')
})