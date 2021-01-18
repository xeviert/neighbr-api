const express = require('express')
const bcrypt = require('bcrypt')
const UsersService = require('./users-service')
const { requireAuth } = require('../middleware/jwt-auth')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'), req.user.user_id)
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }) 
        

module.exports = usersRouter