const usersService = require("../services/mongodb/users.service");

const signUp = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await usersService.signUp(login, password);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json("some error");
  }
};

module.exports = {
  signUp,
};
