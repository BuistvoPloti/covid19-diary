const router = require("express").Router();
const users = require("../../handlers/users.handler");
const { authProtection } = require("../../middlewares/auth"); // add to some routes in dev mode later

//TODO add validation via express-validator

router
  .route("/")
  .get(authProtection, users.getUsers);

router
  .route("/:login")
  .get(users.getUserByLogin);

router
  .route("/signup")
  .post(users.signUp);

router
  .route("/signin")
  .post(users.signIn);

router
  .route("/signout")
  .delete(authProtection, users.signOut);

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
