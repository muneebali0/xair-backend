const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const professionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  }

});

professionSchema.plugin(timestamps);

professionSchema.methods.toJSON = function () {
  const profession = this;
  const professionObject = profession.toObject();
  const professionJson = _.pick(professionObject, [
    "_id",
    "title",
    "status",
  ]);
  return professionJson;
};

const Profession = mongoose.model("Profession", professionSchema);
exports.Profession = Profession;
