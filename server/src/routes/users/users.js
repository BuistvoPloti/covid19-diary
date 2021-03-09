const router = require("express").Router();
const users = require("../../handlers/users.handler");

//TODO add validation middleware + implement one for auth protection
router
  .route("/signup")
  .post(users.signUp);

router
  .route("/signin")
  .post(users.signIn);

router
  .route("/:id/start-quarantine")
  .post(users.startQuarantine);

router
  .route("/:id/end-quarantine")
  .post(users.endQuarantine);

router
  .route("/:id/vaccinate")
  .post(users.vaccinateUser);

router
  .route("/followship/follow")
  .post(users.followUser);

router
  .route("/followship/unfollow")
  .post(users.unfollowUser);

//add some user info get routes

module.exports = router;
