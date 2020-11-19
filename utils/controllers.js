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
        res.send(results);
    }
}
