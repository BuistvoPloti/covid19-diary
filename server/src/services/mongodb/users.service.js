const User = require("../../models/mongodb/user");
const jwt = require("jsonwebtoken");

const signUp = async (login, password) => {
  await User.findOne({ login: login }).exec((err, existing_user) => {
    if (existing_user) {
      throw new Error("login already exists");
    }
  });

  const userBody = {
    login,
    password,
    infected: false,
    vaccinated: false,
    infected_at: null,
    friends: null,
  };
  const user = new User(userBody);
  user.save((err, savedUser) => {
    if (err) {
      console.log('Save user in account activation error');
      throw new Error("Error while saving to database");
    }
  });
  return {
    message: 'Sign up success'
  }
};

const signIn = (req, res, next) => { // refactor and move to handlers some logic
  const { login, password } = req.body;
  User.findOne({login}).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that login does not exist'
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'login or password are incorrect'
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    const { _id, login, vaccinated, infected, infected_at, friends, createdAt, updatedAt } = user;

    return res.json({
      token,
      user: { _id, login, vaccinated, infected, infected_at, friends, createdAt, updatedAt }
    });
  });
};

module.exports = {
  signUp,
  signIn,
};
