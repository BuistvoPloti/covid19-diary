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
    followed_users: null,
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
  const { _id, login, vaccinated, infected, infected_at, followed_users, createdAt, updatedAt } = user;

  return {
    access_token,
    id: _id,
    login,
    vaccinated,
    infected,
    infected_at,
    followed_users,
    createdAt,
    updatedAt
  };
};

const startQuarantine = async (userId) => {
  return await User.findOneAndUpdate(
    {
      _id: userId
    },
    {
      infected: true,
      infected_at: new Date(),
    },
    {
      new: true,
    }
  );
};

const endQuarantine = async (userId) => {
  return await User.findOneAndUpdate(
    {
      _id: userId
    },
    {
      infected: false,
      cured: true,
      cured_at: new Date(),
    },
    {
      new: true,
    }
  );
};

const vaccinateUser = async (userId) => {
  return await User.findOneAndUpdate(
    {
      _id: userId
    },
    {
      vaccinated: true,
    },
    {
      new: true,
    }
  )
};

const followUser = async (currentUserId, followedUserId) => {
  return await User.findOneAndUpdate(
    {
      _id: currentUserId,
    },
    {
      $push: {
        followed_users: followedUserId,
      }
    },
    {
      new: true,
      upsert: true
    },
  )
};

const unfollowUser = async (currentUserId, followedUserId) => {
  return await User.findOneAndUpdate(
    {
      _id: currentUserId,
    },
    {
      $pull: {
        followed_users: { $in: [followedUserId] },
      }
    },
    {
      new: true,
      upsert: true,
    },
  )
};

const getUserByLogin = async (login) => {
  return await User.findOne({ login: login });
};

const getUsers = async () => {
  return await User.find();
};

module.exports = {
  signUp,
  signIn,
  startQuarantine,
  endQuarantine,
  vaccinateUser,
  followUser,
  unfollowUser,
  getUserByLogin,
  getUsers
};
