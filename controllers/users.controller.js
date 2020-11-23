const Users = require('../models/users.model')
const logger = require('../library/logger')
const {buildLimit} = require('../utils/controllers');
const {generatePassword} = require('../utils/users');
const {validationResult} = require('express-validator');

class UsersController {
    static async find(req, res) {
        // /users?limit=10
        // /users?offset=50
        // /users?limit=10&offset=50
        // ******************
        // warning : the default limit is 10
        // see => /utils/controllers.js
        let limits = buildLimit(req, 10);
        try {
            let result = await Users.read({}, limits);
            res.send(result);
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    static async findById(req, res) {
        try {
            let result = await Users.read({id: req.params.id}, [1]);
            res.send(result);
        } catch(err) {
            logger.error(err);
            res.sendStatus(500);
        }
    }

    static async createOne(req, res) {
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

    static async updateOne(req, res) {
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

    static async deleteOne(req, res) {
        // you have enough examples and i'm lazy ;)
        // in fact, i've not implement this method because it depend about your deletion policy
        // you can update and set a field as disabled_at or is_active OR delete the row
    }
}

module.exports = UsersController;
