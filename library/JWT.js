const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_KEY;
class JWT {
    static set(payload) {
        return jwt.sign(payload, KEY);
    }

    static check(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, KEY, (err, payload) => {
                if (err) {
                    reject('Invalid token');
                } else {
                    resolve(payload);
                }
            })
        })
    }
}

module.exports = JWT;
