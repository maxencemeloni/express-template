const md5 = require('md5')
/**
 *
 * @type {string}
 */
const SALT = 'lkefLK85GUD';
exports.generatePassword = (password) => {
    return md5(SALT + password);
}
