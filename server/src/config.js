require("dotenv").config({
  path: `${__dirname}/.env`
});

const env = process.env.NODE_ENV;

const dev = {
  application: {
    port: process.env.PORT,
    baseURL: process.env.BASE_URL,
    secret: process.env.COOKIE_SECRET,
  },
  cookiesConfig: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    signed: true,
    httpOnly: true,
  },
  db: {
    dbNames: {
      mongodb: process.env.DATABASE_NAME_MONGODB,
    },
    currentDbName: process.env.DATABASE_NAME_MONGODB, //or DATABASE_NAME_XXXXX
  },
  mongodb: {
    databaseURI: process.env.DATABASE_URI,
    dbPassword: process.env.DATABASE_PASSWORD,
  },
};

const config = {
  dev,
};

module.exports = config[env];
