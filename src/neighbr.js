require('dotenv').config()
const knex = require('knex')
const FavorsService = require('./favors-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log(FavorsService.getAllFavors())