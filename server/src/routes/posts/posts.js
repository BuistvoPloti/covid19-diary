const router = require("express").Router();
const posts = require("../../handlers/posts.handler");

router
  .route("/")
  .post(posts.createPost);

router
  .route("/reaction")
  .post(posts.handleTogglePostReaction);

module.exports = router;
