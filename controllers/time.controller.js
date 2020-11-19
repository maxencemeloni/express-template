const Time = require('../services/time.service');
const {sendResponse} = require('../utils/controllers');

/* this demo controller uses time API service */
class TimeController {
    static getCET(req, res) {
        Time.get('cet', (...args) => {
            sendResponse(res,...args);
        });
    }
    static getEAST(req, res) {
        Time.get('est', (...args) => {
            sendResponse(res,...args);
        });
    }
}

module.exports = TimeController;
