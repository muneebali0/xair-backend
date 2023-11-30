const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  }

});

educationSchema.plugin(timestamps);

educationSchema.methods.toJSON = function () {
  const education = this;
  const educationObject = education.toObject();
  const educationJson = _.pick(educationObject, [
    "_id",
    "title",
    "status",
  ]);
  return educationJson;
};

const Education = mongoose.model("Education", educationSchema);
exports.Education = Education;
