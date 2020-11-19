const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_KEY;
class JWT {
    /**
     *
     * @param payload
     * @param ip
     * @returns {undefined|*}
     */
    static set(payload, ip) {
        payload.ip = ip;
        return jwt.sign(payload, KEY);
    }

    /**
     *
     * @param token
     * @param ip
     * @returns {Promise<unknown>}
     */
    static check(token, ip) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, KEY, (err, payload) => {
                if (err) {
                    reject('JWT Invalid token');
                } else {
                    if (payload.ip === ip) {
                        resolve(payload);
                    } else {
                        reject('JWT ip has changed')
                    }
                }
            })
        })
    }
}

module.exports = JWT;
