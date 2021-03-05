const usersService = require("../services/mongodb/users.service");
const { authenticateRequest } = require("../utils/auth.utils");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../utils/response-helpers");

const signUp = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await usersService.signUp(login, password);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  if (req.session.isAuthenticated) {
    res.redirect("http://some_url");
    return next({ message: "Already signed in"});
  }

  try {
    const { login, password } = req.body;
    const user = await usersService.signIn(login, password);
    const { access_token, ...userBody } = user;
    await authenticateRequest(req, res, {
      id: userBody.id,
      access_token,
      login,
    });
    return handleSuccessResponse({ user: userBody }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
