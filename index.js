const get = require('lodash.get');
const { format } = require('util');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = options => {
  const MongoClient = get(options, 'MongoClient') || require('mongodb'); // eslint-disable-line global-require
  let mongod;
  let db;
  let config;
  let logger;
  let url;

  const start = async dependencies => {
    config = dependencies.config;
    logger = dependencies.logger || console;
    mongod = new MongoMemoryServer(config.mongodbMemoryServer || {});
    url = await mongod.getUri();
    logger.info(format('Connecting to temporal server on %s', url));
    db = await MongoClient.connect(url, config.options || { useUnifiedTopology: true });
    return db;
  };

  // eslint-disable-next-line consistent-return
  const stop = async cb => {
    if (!db) {
      return cb();
    }
    logger.info(format('Disconnecting from %s', url));
    db.close();
    await mongod.stop();
  };

  return {
    start,
    stop,
  };
};
