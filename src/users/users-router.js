const express = require('express')
const { v4: uuidv4 } = require('uuid')
const logger = require('../logger')
const { users } = require('../store')

const usersRouter = express.Router()
const bodyParser = express.json();

usersRouter
    .route('/profile')
    .get((req, res) => {
        res
        .json(users);
        // This currently brings all users but should bring the information of CURRENT LOGGED IN USER
    })
    .post(bodyParser, (req, res) => {
        const { firstName, lastName, email, password, address } = req.body;

        const id = uuidv4();

        const user = {
            id,
            firstName,
            lastName,
            email,
            password,
            address
        }

        users.push(user);

        logger.info(`User with id ${id} created.`);

        res
            .status(201)
            .location(`http://localhost:8000/profile/${id}`)
            .json(user)
    })

usersRouter
    .route('/profile/id')
    .get((req, res) => {
        
        const { id } = req.params;
        const user = users.find(u => u.id == id);

        if (!user) {
            logger.error(`User with id ${id} not found.`)
            return res
                .status(404)
                .send('User not found')
        }
        res.json(user);
        // This should bring profile information of OTHER users
    })

module.exports = usersRouter