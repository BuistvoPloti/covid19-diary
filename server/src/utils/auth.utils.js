const { cookiesConfig } = require("../config");

const authenticateRequest = (req, res, credentials) => {
  req.session.isAuthenticated = true;
  req.session.login = credentials.login;
  req.session.user_id = credentials.id;
  return res.cookie("access_token", credentials.access_token, cookiesConfig);
};

const setAuthFlag = (data) => Boolean(data);

module.exports = {
  authenticateRequest,
  setAuthFlag,
};
