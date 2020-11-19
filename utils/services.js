const config = require('config');
/**
 *
 * @param api
 * @returns {null|string}
 */
exports.buildUrl = (api) => {
    const conf = config.get('services.'+api);
    return !config.has('services.'+api) ? null :`http:${conf.ssl ? 's' : ''}//${conf.host}${conf.port !== null ? ':' + conf.port : ''}`;
}
