const Users = require('../models/users.model')
const logger = require('../library/logger')

class UsersController {
    static find(req, res) {
        let limit = req.query.limit || 100;
        let offset = req.query.offset || null;
        let limits = [limit];
        if (offset !== null) {
            limits.push(os)
        }

        Users.read({}, [], (err, results) => {
            if (err) {
                res.sendStatus(500);
                logger.error(err);
            } else {
                res.send(results);
            }
        })
    }

    static findOne(req, res) {
        Users.read(req.body, [1], (err, results) => {
            if (err) {
                res.sendStatus(500);
                logger.error(err);
            } else {
                res.send(results)
            }
        })
    }

    static createOne(req, res) {

    }

    static createBulk(req, res) {


    }

    static updateOne(req, res) {

    }

    static deleteOne(req, res) {

    }
}

module.exports = UsersController;
