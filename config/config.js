
'use strict';

const configData = require('./config.json')[process.env.NODE_ENV || 'development'];
const DEFAULT_LOGGER_LEVEL = 'info';

const ENV_CONFIG = {
    getLoggerLevel: () => {
        return configData.logger.level || DEFAULT_LOGGER_LEVEL;
    },
    isConsoleRequired: () => {
        return configData.logger.console;
    }
};


module.exports = {
    ENV_CONFIG
};