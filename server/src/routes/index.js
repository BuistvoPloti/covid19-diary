const router = require("express").Router();
const users = require("./users/users");
const posts = require("./posts/posts");
const certifications = require("./certifications/certifications");

router.use("/users", users);
router.use("/posts", posts);
router.use("/certifications", certifications);

// add other routes here

module.exports = router;
