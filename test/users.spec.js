require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const { makeUsersArray } = require('./users.fixtures')

describe('/profile endpoint', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: "pg",
            connection: process.env.TEST_DB_URL,
        });
        app.set('db', db)
    })

    beforeEach('clean the table', () =>
        db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    )

    describe('GET /profile returns 200 and user information', () => {
        const testUserId = 1;
        const expected = {
            user_id: 1,
            first_name: 'First test post!',
            last_name: 'Blah',
            email: 'test1@yahoo.com',
            password: 'test',
            address: 'testtesttest'
        };
        return supertest(app).get(`/profile`).expect(200, expected)
    })

    describe('POST /register Endpoint', () => {
        const reqFields = ['password', 'email']

        describe('/register validation', () => {
            const testUsers = makeUsersArray()
            reqFields.forEach((field) => {
                const userBody = testUsers[0]

                it(`responds with 400 required error when ${field} is missing`, () => {
                    delete userBody[field]

                    return supertest(app)
                        .post('/register')
                        .send(userBody)
                        .expect(400, {
                            error: `Missing ${field}`
                        })
                })
            })
            it(`responds with 400 'Password must be longer than 8 characters' when password less than 8 characters`, () => {
                let shortPass = (testUsers.password = "short")

                return supertest(app).post('/register').send(shortPass).expect(400)
            })
        })

        it('when valid credentials, creates new user in users table, then responds 201 and JWT auth token using secret', () => {
            const testUsers = makeUsersArray();

            const expectToken = jwt.sign({ user_id: 1 }, process.env.JWT_SECRET, {
                subject: testUsers[0].email,
                algorithm: 'HS256'
            })

            return supertest(app)
                .post('/register')
                .send(testUsers)
                .expect(201)
                .then((res) => {
                    expect(res.body.authToken).to.eql(expectToken)
                })
                .then(() => {
                    return supertest(app).post('/register').send(testUsers).expect(200, {
                        authToken: expectToken
                    })
                })
        })
    })
})