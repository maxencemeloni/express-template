const logger = require('../library/logger');

exports.sendResponse = (res, err, results) => {
    if (err) {
        logger.error(err);
        res.sendStatus(500);
    } else {
        res.send(results);
    }
}
