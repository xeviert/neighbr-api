require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const logger = require('./logger')
const usersRouter = require('./users/users-router')
const loginRouter = require('./login/login-router')

// const FavorsService = require('./favors-service')

const app = express()
const jsonParser = express.json()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//-------------VALIDATES BEARER TOKENS--------------

// app.use(function validateBearerToken(req, res, next) {
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')

//     if (!authToken || authToken.split(' ')[1] !== apiToken) {
//         logger.error(`Unauthorized request to path: ${req.path}`);
//         return res.status(401).json({ error: 'Unauthorized request' })
//     }
//     next()
// })

//---------------------MIDDLEWARE--------------------

app.use(morgan(morganOption))
app.use(helmet())
// app.use(cors({origin: CLIENT_ORIGIN}))
app.use(cors())
app.use(express.json())
app.use('/profile', usersRouter)



//---------------------ENDPOINTS--------------------



// app.get('/', (req, res, next) => {
//     const knexInstance = req.app.get('db')
//     FavorsService.getAllFavors(knexInstance)
//         .then(articles => {
//             res.json(articles)
//         })
//         .catch(next)
// })

// app.get('/:id', (req, res, next) => {
//     res.send('Specific favor')
// })

//--------------------ERROR HANDLER-----------------

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'} }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})


module.exports = app