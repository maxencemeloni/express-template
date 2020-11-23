const Users = require('../models/users.model')
const logger = require('../library/logger')
const {buildLimit} = require('../utils/controllers');
const {generatePassword} = require('../utils/users');
const {validationResult} = require('express-validator');

class UsersController {
    async static find(req, res) {
        let limits = buildLimit(req, 10);
        try {
            let result = Users.read({}, limits);
            res.send(result);
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    async static findOne(req, res) {
        try {
            let result = Users.read({id: req.params.id}, [1]);
            res.send(result);
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    async static createOne(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let data = {
                email: req.body.email,
                password: generatePassword(req.body.password)
            }
            let result = await Users.create(data);
            res.sendStatus(201);
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    async static updateOne(req, res) {
        let data = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if(req.body.password !== undefined) {
            data.password = generatePassword(req.body.password);
        }

        try {
            let result = await Users.update(req.params.id, data);
            if (result.affectedRows > 0) {
                res.send(result);
            } else {
                res.status(404).send({error: 'Nothing updated'})
            }
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    async static deleteOne(req, res) {
        // you have enough examples and i'm lazy ;)
    }
}

module.exports = UsersController;
