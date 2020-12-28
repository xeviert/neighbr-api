const express = require('express')
const { v4: uuidv4 } = require('uuid')
const logger = require('../logger')
const { favors } = require('../store')

const favorsRouter = express.Router()
const bodyParser = express.json();

favorsRouter
    .route('/')
    .get((req, res) => {
        res
        .json(favors);
        // This should bring a list of all favors in CHRONOLOGICAL ORDER.
    })
    .post(bodyParser, (req, res) => {
        const { title, payment, description } = req.body;
        
        const id = uuidv4();

        const favor = {
            id,
            title,
            payment,
            description
        }

        favors.push(favor);

        logger.info(`Favor with id ${id} created.`);

        res
            .status(201)
            .location(`http://localhost:8000/${id}`)
            .json(favor);
    })

favorsRouter
    .route('/:id')
    .get((req, res) => {
        // This should bring the full details of a favor when 'view' button is clicked
        const { id } = req.params;
        const favor = favors.find(fa => fa.id == id);

        if (!favor) {
            logger.error(`Favor with id ${id} not found.`);
            return res
                .status(404)
                .send('Favor not found')
        }
        res.json(favor);
    })
    .delete((req, res) => {
        const { id } = req.params;

        const favorIndex = favors.findIndex(fa => fa.id == id)

        if (favorIndex === -1) {
            logger.error(`Favor with id ${id} not found.`)
            return res
                .status(400)
                .send('Not found')
        }

        favors.splice(favorIndex, 1);

        logger.info(`Favor with id ${id} deleted.`);

        res
            .status(204)
            .end();
    })

module.exports = favorsRouter