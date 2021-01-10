require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeFavorsArr } = require('./favors.fixtures')
const { makeUsersArray } = require('./users.fixtures')

describe('Favors endpoints', () => {
    let db;
    let authToken;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    beforeEach('clean the table', () =>
        db.raw('TRUNCATE TABLE users, favors RESTART INDENTITY CASCADE')
    )
    beforeEach('register and login', () => {
        let user = { email: "testuser@test.com", password: "P@ssword1234"}
        return supertest(app)
            .post('/login')
            .send(user)
            .then((res) => {
                authToken = res.body.authToken;
            })
    })

    after('disconnect from db', () => db.destroy())

    afterEach('cleanup', () => db('tastings').truncate())

    describe('GET /favors', () => {
        context(`Given there are tastings in the db`, () => {
            const testFavors = makeFavorsArr()
            const testUsers = makeUsersArray()

            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            })
            beforeEach('insert favors', () => {
                return db.into('tastings').insert(testFavors)
            })
            it('responds with 200 and all of the favors', () => {
                return supertest(app)
                    .get('/favors')
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect((res) => {
                        expect(res.body.length > 0)
                        expect(res.body[0].title === testFavors[0].title)
                    })
            })
        })
    })

    describe('POST /favors', () => {
        const testUsers = makeUsersArray()
        beforeEach('insert users', () => {
            return db.into('users').insert(testUsers)
        })
        it('creates a favor and responds with 201 and the new favors', () => {
            const newFavor = makeFavorsArr()
            return supertest(app)
                .post('/favor')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newFavor[0])
                .expect(201)
                .then((res) => {
                    expect(res.body.title).to.equal(newFavor[0].title)
                    supertest(app)
                        .get(`/favors`)
                        .then((newRes) => {
                            expect(newRes.body.title).to.equal(newFavor[0].title)
                        })
                })
        })
    })
})


