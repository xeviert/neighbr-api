const express = require('express')
const RegisterService = require('./register-service')

const registerRouter = express.Router()
const jsonParser = express.json()


registerRouter
    .route('/')
    .post(jsonParser, async (req, res, next) => {
        const { first_name, last_name, email, password, address } = req.body      

        for (const field of ['first_name', 'last_name', 'email', 'password', 'address']) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        try {
            const passwordError = RegisterService.validatePassword(password)
    
            if (passwordError)
                return res.status(400).json({ error: passwordError })

            const hasUserWithEmail = await RegisterService.hasUserWithEmail(
                req.app.get('db'),
                email
            )

            if (hasUserWithEmail)
            return res.status(400).json({ error: `email already registered` })

            const hashedPassword = await RegisterService.hashPassword(password)
            const newUser = { 
                first_name, last_name, email, 
                password: hashedPassword, address 
            }    

            const user = await RegisterService.insertUser(
                req.app.get('db'), 
                newUser
            )

            res
                .status(201)
                .json(user)

        } catch (error) {
            next(error)
        }
    })

module.exports = registerRouter