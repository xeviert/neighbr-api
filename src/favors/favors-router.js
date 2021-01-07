const express = require('express')
const path = require('path')
const FavorsService = require('./favors-service')
const { requireAuth } = require('../middleware/jwt-auth')

const favorsRouter = express.Router()
const jsonBodyParser = express.json()

favorsRouter
    .route('/')
    .get((req, res, next) => {
        FavorsService.getAllFavors(req.app.get('db'))
            .then(favors => {
                res.json(favors)
            })
            .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { favor_id, title, payment, description } = req.body
        const newFavor = { favor_id, title, payment, description }

        for (const [key, value] of Object.entries(newFavor))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key}` }
                })
            
        newFavor.user_id = req.user.id

        FavorsService.insertFavor(
            req.app.get('db'), 
            newFavor
            )
        .then((favor) => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${favor.favor_id}`))
            .json(FavorsService.serializeFavor(favor))
        })
        .catch(next)
    })

module.exports = favorsRouter