const express = require('express')
const LoginService = require('./login-service')
const { requireAuth } = require('../middleware/basic-auth')

const loginRouter = express.Router()
const jsonBodyParser = express.json()

loginRouter
    .route('/')
    .post(jsonBodyParser, async (req, res, next) => {
        const { email, password } = req.body
        const loginUser = { email, password }

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

            try {
                const dbUser = await LoginService.getUserWithEmail(
                    req.app.get('db'),
                    loginUser.email
                )

                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect email or password',
                    })

                const compareMatch = await LoginService.comparePasswords(
                    loginUser.password,
                    dbUser.password
                    )

                    if (!compareMatch)
                        return res.status(400).json({
                        error: 'Incorrect email or password',
                        })

                    const sub = dbUser.email
                    const payload = { 
                        user_id: dbUser.id, 
                    }
                    res.send({
                        authToken: LoginService.createJwt(sub, payload),
                        user_id: dbUser.id
                    })
        } catch(error) {
            next(error)
        }
    })

    .put(requireAuth, (req, res) => {
        const sub = req.user.email
        const payload = {
            user_id: req.user.id,
        }
        res.send({
            authToken: LoginService.createJwt(sub, payload)
        })
    })

module.exports = loginRouter