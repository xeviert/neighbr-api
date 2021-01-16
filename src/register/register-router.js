const express = require('express')
const RegisterService = require('./register-service')

const registerRouter = express.Router()
const jsonParser = express.json()


registerRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {

        const { first_name, last_name, email, password, address } = req.body      

        for (const field of ['first_name', 'last_name', 'email', 'password', 'address']) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        const passwordError = RegisterService.validatePassword(password)

        if (passwordError)
            return res.status(400).json({ error: passwordError })

        RegisterService.hasUserWithEmail(
            req.app.get('db'),
            email
        ).then(hasUserWithEmail => {
            if (hasUserWithEmail)
            return res.status(400).json({ error: `email already registered` })
        })

            return RegisterService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = { first_name, last_name, email, password: hashedPassword, address }
                        
                        return RegisterService.insertUser(
                            req.app.get('db'), 
                            newUser
                        )
                            .then(user => {
                                res
                                .status(201)
                                .json(user)
                            })
                })

            .catch(next)
    })

module.exports = registerRouter