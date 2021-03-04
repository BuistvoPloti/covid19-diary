const crypto = require("crypto");

const schemaMethods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

module.exports = schemaMethods;
