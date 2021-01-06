const express = require('express')
const bcrypt = require('bcrypt')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'))
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })
    // I DONT THINK THIS WILL BE NEEDED ANYMORE
    // .post(jsonParser, async (req, res, next) => {
   
    //         const { first_name, last_name, email, password, address } = req.body
    //         const newUser = { first_name, last_name, email, password: hashedPassword, address }
            
    //         for (const [key, value] of Object.entries(newUser)) {
    //             if (value == null) {
    //                 return res.status(400).json({
    //                     error: { message: `Missing '${key}' in request body` }
    //                 })
    //             }
    //         }

    //         UsersService.insertUser(
    //             req.app.get('db'),
    //             newUser
    //         )
    //             .then(user => {
    //                 res
    //                 .status(201)
    //                 .json(user)
    //             })
    //             .catch(next)

    // })

        //I could use .all(), end of checkpoint 16  
          
usersRouter
    .route('/:user_id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getById(knexInstance, req.params.user_id)
        .then(user => {
            if (!user) {
              return res.status(404).json({
                error: { message: `User doesn't exist` }
              })
            }
           res.json(user)
           //I did not do XSS, sanitize, checkpoint 16
        })
        .catch(next)
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { first_name, last_name, email, password, address } = req.body
        const userToUpdate = { first_name, last_name, email, password, address }

        const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
            if (numberOfValues === 0) {
                return res.status(400).json({
                error: {
                    message: `Request body must contain   either 'title', 'style' or 'content'`
                }
                })
            }

        UsersService.updateUser(
            req.app.get('db'),
            req.params.user_id,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = usersRouter