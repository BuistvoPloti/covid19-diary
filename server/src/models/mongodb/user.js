const { Schema, model } = require("mongoose");
//const plugins = require("../../utils/mongoose.plugins");

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  infected_at: Date,
  infected: Boolean,
  vaccinated: Boolean,
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User", //should work
    default: null,
  }
});

//plugins.prettifyRecords(UserSchema);

module.exports = model("User", UserSchema);
