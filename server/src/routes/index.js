const router = require("express").Router();
// import routes here

router.use("/test", (req, res, next) => {
  res.send("hello, world")
});

// add other routes here

module.exports = router;
