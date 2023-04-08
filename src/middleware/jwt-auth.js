const { JsonWebTokenError } = require('jsonwebtoken')
const LoginService = require('../login/login-service')

async function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let bearerToken
    if (!authToken.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'Missing bearer token' })
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
        // .then(user => {
        //     if (!user)
        //       return res.status(401).json({ error: 'Unauthorized request' })
        //     req.user = user
        //     next()
        // })
        // .catch(err => {
        //     next(err)
        // })
    } catch(error) {
        // res.status(401).json({ error: 'Unauthorized request' })
        if (error instanceof JsonWebTokenError)
            return res.status(401).json({ error: 'Unauthorized request' })

            next(error)
    }
}

module.exports = {
    requireAuth,
}