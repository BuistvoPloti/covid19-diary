const { getFormattedDate } = require("./date.utils");

const prettifyRecords = (baseSchema) => {
  baseSchema.plugin((schema) => {
    schema.options.toJSON = {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.salt;
        delete ret.hashed_password;
        delete ret.password;
        ret.createdAt = getFormattedDate(ret.createdAt);
        ret.updatedAt = getFormattedDate(ret.updatedAt);
      },
    };
  });
};

module.exports = { prettifyRecords };
