const User = require("../../models/mongodb/user");
const jwt = require("jsonwebtoken");
const { throwCustomException } = require("../../utils/response-helpers");

const signUp = async (login, password) => {
  const userExists = await User.exists({ login });
  if (userExists) {
    throwCustomException("Login already registered");
  }

  const userBody = {
    login,
    password,
    infected: false,
    vaccinated: false,
    infected_at: null,
    friends: null,
  };
  const user = !userExists && await new User(userBody);
  return user && user.save();
};

const signIn = async (userLogin, password) => {
  const user = await User.findOne({ login: userLogin });

  if (!user) {
    throwCustomException("User with that login does not exist")
  }

  if (!user.authenticate(password)) {
    throwCustomException("Incorrect login or password")
  }

  const access_token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: "7d" } );
  const { _id, login, vaccinated, infected, infected_at, friends, createdAt, updatedAt } = user;

  return {
    access_token,
    id: _id,
    login,
    vaccinated,
    infected,
    infected_at,
    friends,
    createdAt,
    updatedAt
  };
};

module.exports = {
  signUp,
  signIn,
};
