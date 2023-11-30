const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const bloodGroupSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  }

});

bloodGroupSchema.plugin(timestamps);

bloodGroupSchema.methods.toJSON = function () {
  const bloodGroup = this;
  const bloodGroupObject = bloodGroup.toObject();
  const bloodGroupJson = _.pick(bloodGroupObject, [
    "_id",
    "title",
    "status",
  ]);
  return bloodGroupJson;
};

const BloodGroup = mongoose.model("BloodGroup", bloodGroupSchema);
exports.BloodGroup = BloodGroup;
