const router = require("express").Router();
const users = require("../../handlers/users.handler");

//TODO add validation middleware + implement one for auth protection
router
  .route("/signup")
  .post(users.signUp);

router
  .route("/signin")
  .post(users.signIn);

module.exports = router;
