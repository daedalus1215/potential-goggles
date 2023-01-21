const log4js = require('log4js');

log4js.configure({
  appenders: { error: { type: 'file', filename: 'error.log' } },
  categories: { default: { appenders: ['error'], level: 'error' } },
});

const logger = log4js.getLogger();
logger.level = 'error'; //@TODO: Probs make this configurable

module.exports = logger;
