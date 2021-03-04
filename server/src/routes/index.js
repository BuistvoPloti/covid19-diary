const router = require("express").Router();
const users = require("./users/users");

router.use("/users", users);

// add other routes here

module.exports = router;
