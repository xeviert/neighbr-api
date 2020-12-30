const express = require('express')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
    .route('/profile')
    .get((req, res, next) => {
        UsersService.getAllUsers(
            req.app.get('db')
        )
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })
    // .post(jsonParser, (req, res, next) => {
    //     const { first_name, last_name, email, password, address } = req.body
    //     const newUser = { first_name, last_name, email, password, address }
    //     UsersService.insertUser(
    //         req.app.get('db'),
    //         newUser
    //     )
    //         .then(user => {
    //             res
    //               .status(201)
    //               .json(user)
    //         })
    //         .catch(next)
    // })

// usersRouter
//     .route('/profile/:user_id')
//     .get((req, res, next) => {
//         const knexInstance = req.app.get('db')
//         UsersService.getById(knexInstance, req.params.user_id)
//         .then(user => {
//             if (!user) {
//               return res.status(404).json({
//                 error: { message: `User doesn't exist` }
//               })
//             }
//            res.json(user)
//         })
//         .catch(next)
//     })

module.exports = usersRouter