const pg = require('pg')
const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')

pg.defaults.ssl = process.env.NODE_ENV === "production"

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)

app.get('/', (req, res) => res.send('Deployed! 🚀'));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! Neighbr-API is live!`);
});
