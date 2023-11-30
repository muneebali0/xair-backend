const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const addressSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  }

});

addressSchema.plugin(timestamps);

addressSchema.methods.toJSON = function () {
  const address = this;
  const addressObject = address.toObject();
  const addressJson = _.pick(addressObject, [
    "_id",
    "title",
    "status",
  ]);
  return addressJson;
};

const Address = mongoose.model("Address", addressSchema);
exports.Address = Address;
