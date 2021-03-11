const authProtection = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.status(403).send("Not authorized");
  }
  return next();
};

module.exports = {
  authProtection,
};
