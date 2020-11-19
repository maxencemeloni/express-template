const logger = require('../library/logger')
/**
 *
 * @param error
 */
exports.onError = (error) => {
    /** @namespace error.syscall */
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof API_PORT === 'string'
        ? 'Pipe ' + API_PORT
        : 'Port ' + API_PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

exports.onListening = (server)  => {
const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
}
