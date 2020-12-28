require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})


function searchByFirstName(searchTerm) {
knexInstance
  .select('user_id', 'first_name', 'last_name', 'email', 'password', 'address')
  .from('users')
  .where('first_name', 'ILIKE', `%${searchTerm}%`)
  .then(result => {
    console.log(result)
  })
}

searchByFirstName('moises')

function paginateUsers(page) {
  const productsPerPage = 10
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('user_id', 'first_name', 'last_name', 'email', 'password', 'address')
    .from('users')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

paginateProducts(2)