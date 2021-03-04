const { Schema, model } = require("mongoose");
const schemaMethods = require("../../utils/mongodb.utils");
//const plugins = require("../../utils/mongoose.plugins");

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    max: 24
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  infected_at: {
    type: Date,
    default: null,
  },
  infected: {
    type: Boolean,
    default: null,
  },
  vaccinated: {
    type: Boolean,
    default: null,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User", //should work
    default: null,
  }
}, {timestamps: true});

//plugins.prettifyRecords(UserSchema);

UserSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = schemaMethods;

module.exports = model("User", UserSchema);
