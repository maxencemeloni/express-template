const md5 = require('md5')
/**
 *
 * @type {string}
 */
const SALT = process.env.PASWWORD_SALT;
exports.generatePassword = (password) => {
    return md5(SALT + password);
}
