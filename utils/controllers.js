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
* @param req
* @param defaultLimit
* @returns {int|string}
*/
exports.buildLimit = (req, defaultLimit = 10) => {
    let offset = parseInt(req.query.offset) || null;
    let limits = '';
    if (offset !== null) {
        limits += offset + ',';
    }
    limits += parseInt(req.query.limit) || defaultLimit;
    return limits;
}
