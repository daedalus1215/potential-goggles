const logger = require('../logger');

module.exports = (err, docs) => {
  if (err) {
    logger.error(`Error hydrating: ${err}`);
    return { 'error': err };
  }

  return docs;
};
