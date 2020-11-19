const fetch = require('node-fetch');
const logger = require('../library/logger');
const {buildUrl} = require('../utils/services');

class Time {
    static get(timeZone, next) {
        const uri = '/api/json/' + timeZone + '/now';
        const url = buildUrl('api-time');
        if (url === null) {
            next('Service unavailable');
        }
        fetch(url + uri).then(res => {
            const status = res.status;
            if (status !== 200 && status !== 201) {
                logger.error(res);
                next('An error occurred');
            } else {
                res.text()
            }
        }).then(body => {
            // TODO debug, body undefined
            console.log(body);
            next(null, body);
        }).catch(err => {
            logger.error('Error on fetch', err);
            next(err, null)
        })
    }
}

module.exports = Time;
