const logger = require('../library/logger');
/**
 *
 * @param res
 * @param err
 * @param results
 */
exports.sendResponse = (res, err, results) => {
    if (err) {
        logger.error(err);
        res.sendStatus(500);
    } else {
        if (results.insertedRows > 0) {
            res.sendStatus(201);
        } else {
            res.send(results);
        }
    }
}

/**
 * TODO return a string ready to be used in the query
 * @param req
 * @param defaultLimit
 * @returns {[number|string|string]}
 */
exports.buildLimit = (req, defaultLimit = 10) => {
    let limit = req.query.limit || defaultLimit;
    let offset = req.query.offset || null;
    let limits = [limit];
    if (offset !== null) {
        limits.push(offset)
    }
    return limits;
}
