const router = require("express").Router();
const users = require("../../handlers/users.handler");

router
  .route("/signup")
  .post(users.signUp);

module.exports = router;
