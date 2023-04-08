const { JsonWebTokenError } = require('jsonwebtoken')
const LoginService = require('../login/login-service')

async function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let bearerToken
    if (!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({ error: 'Missing basic token' })
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = LoginService.verifyJwt(bearerToken)
        const user = await LoginService.getUserWithEmail(
            req.app.get('db'),
            payload.sub,
        )

        if (!user)
        return res.status(401).json({ error: 'Unauthorized request' })
  
        req.user = user
        next()
    } catch (error) {
        if (error instanceof JsonWebTokenError)
            return res.status(401).json({ error: 'Unauthorized request' })
  
      next(error)
    }

    // const [tokenEmail, tokenPassword] = LoginService.parseBasicToken(basicToken)
    // LoginService.getUserWithEmail(
    //     req.app.get('db'),
    //     tokenEmail
    // )
    // if (!tokenEmail || !tokenPassword) {
    //     return res.status(401).json({ error: 'Unauthorized request' })
    // }
    // .then(user => {
    //     if (!user) {
    //         return res.status(401).json({ error: 'Unauthorized request'})
    //     }

    //     return LoginService.comparePasswords(tokenPassword, user.password)
    //         .then(passwordsMatch => {
    //             if (!passwordsMatch) {
    //                 return res.status(401).json({ error: 'Unauthorized request' })
    //             }

    //             req.res = user
    //             next()
    //         })
    // })
    // .catch(next)
}

module.exports = {
    requireAuth,
}