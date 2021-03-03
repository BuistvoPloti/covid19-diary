const { initMongoDb } = require("./mongodb");
const { log } = require("../utils/logger.utils");
const { db: { dbNames } } = require("../config");

const dbInitializers = {
  [dbNames.mongodb]: initMongoDb,
  nodb: () => log("No db specified, check the config file"),
};

const initDb = (dbName) => {
  const initialize = dbInitializers[dbName] || dbInitializers.nodb;
  return () => initialize();
};

module.exports = {
  initDb
};
