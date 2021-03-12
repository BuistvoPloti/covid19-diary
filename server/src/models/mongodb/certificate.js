const { Schema, model } = require("mongoose");
const plugins = require("../../utils/mongoose-plugins");

const CertificateSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  pdf: {
    type: Schema.Types.Buffer,
    default: null,
  },
  png: {
    type: Schema.Types.Buffer,
    default: null,
  },
}, { timestamps: true });

plugins.prettifyRecords(CertificateSchema);

module.exports = model("Certificate", CertificateSchema);
