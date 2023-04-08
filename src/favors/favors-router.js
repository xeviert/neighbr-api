const express = require('express')
const path = require('path')
const FavorsService = require('./favors-service')
const { requireAuth } = require('../middleware/jwt-auth')

const favorsRouter = express.Router()
const jsonBodyParser = express.json()

favorsRouter
    .route('/')
    .get(async (req, res, next) => {
        try {
            const favors = await FavorsService.getAllFavors(req.app.get('db'))
            res.json(favors)
        } catch (error) {
            next(error)
        }
        // FavorsService.getAllFavors(req.app.get('db'))
        //     .then(favors => {
        //         res.json(favors)
        //     })
            // .catch(next)
    })

    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { title, payment, description } = req.body
        const newFavor = { title, payment, description }

        for (const [key, value] of Object.entries(newFavor))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key}` }
                })
            
        newFavor.user_id = req.user.user_id

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