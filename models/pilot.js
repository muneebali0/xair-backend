const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const pilotSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date_of_birth: {
    type: Date,
  },
  certificate_image: {
    type: String,
    trim: true,
  },
  is_certified: {
    type: Boolean,
    default: false,
  },
  have_night_rating: {
    type: Boolean,
    default: false,
  },
  night_rating_file: {
    type: String,
    trim: true,
  },
  user_type: {
    type: String,
    default: "pilot",
  },
});

pilotSchema.plugin(timestamps);

pilotSchema.methods.toJSON = function () {
  const pilot = this;
  const pilotObject = pilot.toObject();
  const pilotJson = _.pick(pilotObject, [
    "_id",
    "first_name",
    "last_name",
    "email",
    "password",
    "phone_number",
    "status",
    "date_of_birth",
    "certificate_image",
    "is_certified",
    "have_night_rating",
    "night_rating_file",
    "user_type",
  ]);

  if (!pilotJson.user_type) {
    pilotJson.user_type = "pilot";
  }

  return pilotJson;
};

function validatePilot(pilot) {
  const schema = {
    first_name: Joi.string().min(3).max(10).required().trim(),
    last_name: Joi.string().min(3).max(10).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(2).max(25).required().trim(),
    phone_number: Joi.string().trim().required(),
    status: Joi.boolean().allow(null, ""),
    date_of_birth: Joi.string().allow(null, ""),
    is_certified: Joi.boolean().required(),
    have_night_rating: Joi.boolean().required(),
    user_type: Joi.string().allow(null, ""),
  };
  return Joi.validate(pilot, schema);
}

function validateEditPilot(pilot) {
  const schema = {
    first_name: Joi.string().min(3).max(10).required().trim(),
    last_name: Joi.string().min(3).max(10).required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(2).max(25).required().trim(),
    phone_number: Joi.string().trim().required(),
    status: Joi.boolean().required(),
    date_of_birth: Joi.string().allow(null, ""),
    certificate_image: Joi.string().allow(null, ""),
    is_certified: Joi.boolean().required(),
  };
  return Joi.validate(pilot, schema);
}

function validateLoginPilot(pilot) {
  const schema = {
    email: Joi.string().required().trim(),
    password: Joi.string().min(5).max(25).required().trim(),
    platform: Joi.string().allow(null, ""),
    device_token: Joi.string().allow(null, ""),
    user_type: Joi.string().allow(null, ""),
  };
  return Joi.validate(pilot, schema);
}

const Pilot = mongoose.model("Pilot", pilotSchema);
exports.Pilot = Pilot;
exports.validatePilot = validatePilot;
exports.validateEditPilot = validateEditPilot;
exports.validateLoginPilot = validateLoginPilot;
