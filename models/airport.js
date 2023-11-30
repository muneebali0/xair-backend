const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const airportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  country_name: {
    type: String,
    required: true,
    trim: true,
  },
  city_name: {
    type: String,
    required: true,
    trim: true,
  },
  state_name: {
    type: String,
    trim: true,
  },
  address_1: {
    type: String,
    trim: true,
  },
  address_2: {
    type: String,
    trim: true,
  },
  postal_code: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

airportSchema.plugin(timestamps);

airportSchema.methods.toJSON = function () {
  const airport = this;
  const airportObject = airport.toObject();
  const airportJson = _.pick(airportObject, [
    "_id",
    "title",
    "country_name",
    "city_name",
    "state_name",
    "address_1",
    "address_2",
    "postal_code",
    "status",
  ]);

  

  return airportJson;
};

function validateAirport(airport) {
  const schema = {
    title: Joi.string().required().trim(),
    country_name: Joi.string().required().trim(),
    city_name: Joi.string().required().trim(),
    state_name: Joi.string().allow("").trim(),
    address_1: Joi.string().allow("").trim(),
    address_2: Joi.string().allow("").trim(),
    postal_code: Joi.string().allow("").trim(),
    status: Joi.boolean().allow(""),
  };
  return Joi.validate(airport, schema);
}

const Airport = mongoose.model("Airport", airportSchema);

exports.Airport = Airport;
exports.validateAirport = validateAirport;
