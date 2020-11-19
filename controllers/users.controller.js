const Users = require('../models/users.model')
const logger = require('../library/logger')
const {sendResponse} = require('../utils/controllers');
const {validateEmail, validatePassword, generatePassword} = require('../utils/users');

class UsersController {
    async static find(req, res) {
        let limit = req.query.limit || 100;
        let offset = req.query.offset || null;
        let limits = [limit];
        if (offset !== null) {
            limits.push(offset)
        }
        try {

        } catch(err) {

        }
        Users.read({}, limits, (err, results) => {
            sendResponse(res, err, results);
        })
    }

    async static findOne(req, res) {
        Users.read({id: req.params.id}, [1], (err, results) => {
            sendResponse(res, err, results);
        })
    }

    async static createOne(req, res) {
        if (validateEmail(req.body.email) && validatePassword(req.body.password)) {
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
        } else {
            res.sendStatus(400);
        }
    }

    async static updateOne(req, res) {
        let data = {};
        let valid = true;
        if (req.body.email !== undefined) {
            if (validateEmail(req.body.email)) {
                data.email = req.body.email;
            } else {
                valid = false;
            }
        }
        if (valid && req.body.password !== undefined) {
            if (validatePassword(req.body.password)) {
                data.password = generatePassword(req.body.password);
            } else {
                valid = false;
            }
        }

        if (valid) {
            Users.update(req.params.id, data, (err, result) => {
                if (err) {
                    logger.error(err);
                    res.sendStatus(500);
                } else if (result.affectedRows === 0) {
                    res.status(404).send({error: 'Nothing updated'})
                } else {
                    res.send(result);
                }
            })
        } else {
            res.sendStatus(400);
        }
    }

    async static deleteOne(req, res) {
        // TODO finish this example
    }
}

module.exports = UsersController;
