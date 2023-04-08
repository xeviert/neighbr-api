require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
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

app.use(errorHandler)

module.exports = app