const sha1 = require('sha1');

class Cache {

    /**
     *
     * @param active
     */
    constructor(active = true) {
        this.isActive = active;
        if (active) {
            this.redis = require('../datasource/redis');
        }
    }

    /**
     *
     * @param table
     * @param req
     * @param attr
     * @returns {string}
     */
    key(table, req, attr = []) {
        let attrType = typeof attr;
        if (attrType !== 'array' && attrType !== 'object' || attr === null) {
            attr = [attr];
        }
        let args = sha1(req + '_' + attr.join(','));
        return `${table}_${args}`;
    }

    /**
     *
     * @param key
     * @param data
     * @param expiration
     */
    set(key, data, expiration = 60) {
        if (this.isActive) {
            data = JSON.stringify(data);
            if (expiration === null) {
                this.redis.set(key, data);
            } else {
                this.redis.setex(key, expiration, data)
            }
        }
    }

    /**
     *
     * @param key
     * @returns {Promise<unknown>}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            if (this.isActive) {
                this.redis.get(key, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(result));
                    }
                });
            } else {
                resolve([]);
            }
        });

    }

    /**
     *
     * @param key
     */
    delete(key) {
        if (this.isActive)
        this.redis.del(key);
    }

    /**
     *
     */
    flush() {
        if (this.isActive)
            this.redis.flushdb();
    }


}

module.exports = new Cache(false);
