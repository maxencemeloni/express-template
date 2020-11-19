const JWT = require('../library/JWT');
const logger = require('../library/logger');
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {this}
 */
exports.isAllowed = (req, res, next) => {
    let token = req.headers.token;
    if (token !== undefined) {
        if (token[1] === undefined) {
            logger.debug('')
            return res.sendStatus(401);
        }
        JWT.check(token).then(payload => {
            next()
        }).catch(err => {
            return res.sendStatus(401);
        });
    } else {
        return res.sendStatus(401);
    }
}
