require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const favorsRouter = require('./favors/favors-router')
const usersRouter = require('./users/users-router')
const registerRouter = require('./register/register-router')
const loginRouter = require('./login/login-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//---------------------MIDDLEWARE--------------------

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

//--------------------ROUTERS---------------------------
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/profile', usersRouter)
app.use('/favors', favorsRouter)

//--------------------ERROR HANDLER-----------------

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'} }
    } else {
        response = { message: error.message, error }
    }
    console.error(error)
    res.status(500).json(response)
});


module.exports = app