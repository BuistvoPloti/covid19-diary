const app = require("./app");
const {
  application: { port },
} = require("./config");
const { log }  = require("./utils/logger.utils");

log("initialize db here");

app.listen(port, () => {
  log(`Application is running on port ${port}`);
});
