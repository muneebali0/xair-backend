const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const memberUserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
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
  user_type: {
    type: String,
    default: "member",
  },
  // airport: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  // airports: [
  //   {
  //     _id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Airport",
  //     },
  //   },
  // ],
});

memberUserSchema.plugin(timestamps);

memberUserSchema.methods.toJSON = function () {
  const memberUser = this;
  const memberUserObject = memberUser.toObject();
  const memberUserJson = _.pick(memberUserObject, [
    "_id",
    "first_name",
    "last_name",
    "password",
    "phone_number",
    "email",
    "status",
    "date_of_birth",
    "user_type",
    // "airports",
    // "airport",
  ]);

  if (!memberUserJson.user_type) {
    memberUserJson.user_type = "member";
  }

  return memberUserJson;
};

function validateMemberUser(memberUser) {
  const schema = {
    first_name: Joi.string().min(3).max(10).required().trim(),
    last_name: Joi.string().min(3).max(10).required().trim(),
    password: Joi.string().min(2).max(25).required().trim(),
    email: Joi.string().email().required().trim(),
    phone_number: Joi.string().trim().required(),
    status: Joi.boolean().allow(null, ""),
    date_of_birth: Joi.string().allow(null, ""),
    // airports: Joi.array().allow(null, ""),
    airport: Joi.string().allow(null, ""),
    user_type: Joi.string().allow(null, ""),
  };
  return Joi.validate(memberUser, schema);
}

function validateEditMemberUser(memberUser) {
  const schema = {
    first_name: Joi.string().min(3).max(10).required().trim(),
    last_name: Joi.string().min(3).max(10).required().trim(),
    password: Joi.string().min(2).max(25).required().trim(),
    email: Joi.string().email().required().trim(),
    phone_number: Joi.string().trim().required(),
    status: Joi.boolean().required(),
    date_of_birth: Joi.string().allow(null, ""),
    // airports: Joi.array().allow(null, ""),
    // airport: Joi.string().allow(null, ""),
  };
  return Joi.validate(memberUser, schema);
}

function validateLoginMemberUser(memberUser) {
  const schema = {
    email: Joi.string().required().trim(),
    password: Joi.string().min(5).max(25).required().trim(),
    platform: Joi.string().allow(null, ""),
    device_token: Joi.string().allow(null, ""),
    user_type: Joi.string().allow(null, ""),
  };
  return Joi.validate(memberUser, schema);
}

const MemberUser = mongoose.model("MemberUser", memberUserSchema);
exports.MemberUser = MemberUser;
exports.validateMemberUser = validateMemberUser;
exports.validateEditMemberUser = validateEditMemberUser;
exports.validateLoginMemberUser = validateLoginMemberUser;
