const Users = require('../models/users.model');
const logger = require('../library/logger');
const {validationResult} = require('express-validator');
const {sendResponse, buildLimit} = require('../utils/controllers');
const {generatePassword} = require('../utils/users');

class UsersController {
    // /users?limit=10
    // /users?offset=50
    // /users?limit=10&offset=50
    // ******************
    // warning : the default limit is 10
    // see => /utils/controllers.js

    static find(req, res) {
        const limits = buildLimit(req, 100);
        Users.read({}, limits, (err, results) => {
            sendResponse(res, err, results);
        })
    }

    static findById(req, res) {
        Users.read({id: req.params.id}, [1], (err, results) => {
            sendResponse(res, err, results);
        })
    }

    static createOne(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        let data = {
            email: req.body.email,
            password: generatePassword(req.body.password)
        }
        Users.create(data, (err, result) => {
            if (err) {
                logger.error(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        })
    }

    static updateOne(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        let data = {};
        if (req.body.email !== undefined) {
            data.email = req.body.email;
        }
        if (req.body.password !== undefined) {
            data.password = generatePassword(req.body.password);
        }

        Users.update(req.params.id, data, (err, result) => {
            if (err) {
                logger.error(err);
                res.sendStatus(500);
            } else if (result.affectedRows === 0) {
                res.status(404).send({error: 'Nothing updated'})
            } else {
                res.send(result);
            }
        });
    }

    static deleteOne(req, res) {
        // you have enough examples and i'm lazy ;)
        // in fact, i've not implement this method because it depend about your deletion policy
        // you can update and set a field as disabled_at or is_active OR delete the row
    }
}

module.exports = UsersController;
