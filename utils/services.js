const config = require('config');
exports.buildUrl = (api) => {
    const conf = config.get('services.'+api);
    return !config.has('services.'+api) ? null :`http:${conf.ssl ? 's' : ''}//${conf.host}${conf.port !== null ? ':' + conf.port : ''}`;
}
