// const { expect } = require('chai')
// const knex = require('knex')
// const app = require('../src/app')
// const { makeUsersArray } = require('./users.fixtures')

// describe.only('Users Endpoints', function() {
//     let db

//     before('make knex instance', () => {
//       db = knex({
//         client: 'pg',
//         connection: process.env.TEST_DB_URL,
//       })
//       app.set('db', db)
//     })
  
//     after('disconnect from db', () => db.destroy())
  
//     before('clean the table', () => db('users').truncate())

//     afterEach('cleanup', () => db('users').truncate())

//     describe(`GET /articles`, () => {
//         context(`Given no users`, () => {
//             it(`responds with 200 and an empty list`, () => {
//                 return supertest(app)
//                  .get('/profile')
//                  .expect(200, [])
//             })
//         })

//         context('Given there are users in the database', () => {
//             const testUsers = makeUsersArray()
        
//             beforeEach('insert users', () => {
//                 return db
//                     .into('users')
//                     .insert(testUsers)
//             })

//             it('GET /profile responds with 200 and all of the users', () => {
//                 return supertest(app)
//                     .get('/profile')
//                     .expect(200, testUsers)
//             })
//         })
//     })
// })

// describe.only(`POST /profile`, () => {
//     it(`creates a user, responding with 201 and the new user`,  function() {
//       this.retries(3)
//       const newUser = {
//         first_name: 'TEST FIRST NAME!',
//         last_name: 'TEST LAST NAME',
//         email: 'testTEST@yahoo.com',
//         password: 'TEST',
//         address: 'testtesttest'
//       }

//       return supertest(app)
//         .post('/profile')
//         .send(newUser)
//         .expect(201)
//         .expect(res => {
//             expect(res.body.first_name).to.eql(newUser.first_name)
//             expect(res.body.last_name).to.eql(newUser.last_name)
//             expect(res.body.email).to.eql(newUser.email)
//             expect(res.body.password).to.eql(newUser.password)
//             expect(res.body.address).to.eql(newUser.address)
//             expect(res.body).to.have.property('user_id')
//             expect(res.headers.location).to.eql(`/profile/${res.body.user_id}`)
//         })
//         .then(postRes =>
//           supertest(app)
//             .get(`/profile/${postRes.body.id}`)
//             .expect(postRes.body)
//         )
//     })
// })    

