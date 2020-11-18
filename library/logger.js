const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;
const packageJson = require('../package.json');
const config = require('config');
const DailyRotateFile = require('winston-daily-rotate-file');
const logDir = './logs';

const options = {
    file: {
        level: (config.has('log.level')) ? config.get('log.level') : 'info',
        filename: logDir + `/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: format.simple(),
    },
};

const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),

        // it will create date wise logfile like 2018-02-04-results.log
        new DailyRotateFile({
            filename:logDir + `/app-%DATE%.log`,
            datePattern: 'YYYY_MM_DD',
            prepend: true,
            level: (config.has('log.level')) ? config.get('log.level') : 'info'
        })
    ],
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    },
};

module.exports = logger;
