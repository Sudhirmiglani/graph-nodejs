
'use strict';

const winston = require('winston');
const fs = require('fs');
const ENV_CONFIG = require('./config').ENV_CONFIG;


// logger
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
let logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: ENV_CONFIG.getLoggerLevel()
        }),
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/-results.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: ENV_CONFIG.getLoggerLevel()
        })
    ]
});

// no console required
if (!ENV_CONFIG.isConsoleRequired()) {
    logger.remove(winston.transports.Console);
}


module.exports = logger;