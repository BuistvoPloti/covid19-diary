const app = require("./app");
const {
  application: { port },
  db: { currentDbName }
} = require("./config");
const { initDb } = require("./db/db");
const { log }  = require("./utils/logger.utils");

initDb(currentDbName)();

app.listen(port, () => {
  log(`Application is running on port ${port}`);
});
