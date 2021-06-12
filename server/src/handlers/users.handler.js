const usersService = require("../services/mongodb/users.service");
const { authenticateRequest } = require("../utils/auth.utils");
const { log } = require("../utils/logger.utils");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../utils/response-helpers");

const signUp = async (req, res, next) => {
  try {
    const { login, password, email } = req.body;
    const user = await usersService.signUp(login, email, password);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  if (req.session.isAuthenticated) {
    log("Already signed in");
    return res.redirect("https://google.com");
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

const signOut = (req, res, next) => {
  res.clearCookie("access_token");
  res.clearCookie("connect.sid");
  req.session.destroy();
  return res.status(204).send("logged out");
};

const startQuarantine = async (req, res, next) => {
  try {
    //const userId = req.body;
    const userId = req.params.id;
    const quarantineData = await usersService.startQuarantine(userId);
    return handleSuccessResponse({ user: quarantineData }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const endQuarantine = async (req, res, next) => {
  try {
    //const userId = req.body;
    const userId = req.params.id;
    const quarantineData = await usersService.endQuarantine(userId);
    return handleSuccessResponse({ user: quarantineData }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const vaccinateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const vaccinatedUser = await usersService.vaccinateUser(userId);
    return handleSuccessResponse({ user: vaccinatedUser }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { currentUserId, followedUserId } = req.body;
    const user = await usersService.followUser(currentUserId, followedUserId);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const { currentUserId, followedUserId } = req.body;
    const user = await usersService.unfollowUser(currentUserId, followedUserId);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getUserByLogin = async (req, res, next) => {
  try {
    const { login } = req.params;
    const user = await usersService.getUserByLogin(login);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    return handleSuccessResponse({ user }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    return handleSuccessResponse({ users }, res);
  } catch (err) {
    handleErrorResponse(res, err);
    return next(err);
  }
};

module.exports = {
  getUserById,
  signUp,
  signIn,
  signOut,
  startQuarantine,
  endQuarantine,
  vaccinateUser,
  followUser,
  unfollowUser,
  getUserByLogin,
  getUsers
};
