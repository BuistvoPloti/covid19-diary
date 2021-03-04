const { Schema, model } = require("mongoose");
//const plugins = require("../../utils/mongoose.plugins");

const PostSchema = new Schema({
  fever: {
    type: Boolean,
    required: true,
  },
  dry_cough: {
    type: Boolean,
    required: true,
  },
  tiredness: {
    type: Boolean,
    required: true,
  },
  chest_pain_or_pressure: {
    type: Boolean,
    required: true,
  },
  loss_of_taste_or_smell: {
    type: Boolean,
    required: true,
  },
  difficulty_breathing: {
    type: Boolean,
    required: true,
  },
  sore_throat: {
    type: Boolean,
    required: true,
  },
  conjunctivitis: {
    type: Boolean,
    required: true,
  },
  headache: {
    type: Boolean,
    required: true,
  },
  vomiting: {
    type: Boolean,
    required: true,
  },
  fatigue: {
    type: Boolean,
    required: true,
  },
  chills: {
    type: Boolean,
    required: true,
  },
  rash: {
    type: Boolean,
    required: true,
  },
  nausea: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

//plugins.prettifyRecords(UserSchema);

module.exports = model("Post", PostSchema);
