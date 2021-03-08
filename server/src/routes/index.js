const router = require("express").Router();
const users = require("./users/users");
const posts = require("./posts/posts");

router.use("/users", users);
router.use("/posts", posts);

// add other routes here

module.exports = router;
