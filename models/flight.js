const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");
const moment = require("moment-timezone");

const flightSchema = new mongoose.Schema({
  pilot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pilot",
  },
  available_seats: {
    type: Number,
  },
  cost_per_seat: {
    type: Number,
  },
  total_cost: {
    type: Number,
  },
  departure_airport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
  },
  return_airport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
  },
  departure_date: {
    type: Date,
  },
  return_date: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: true,
  },
  note: {
    type: String,
    default: "",
  },
});

flightSchema.plugin(timestamps);

flightSchema.methods.toJSON = function () {
  const flight = this;
  const flightObject = flight.toObject();
  const flightJson = _.pick(flightObject, [
    "_id",
    "pilot",
    "available_seats",
    "cost_per_seat",
    "total_cost",
    "departure_airport",
    "return_airport",
    "departure_date",
    // "return_date",
    "status",
    "note",
    "createdAt",
    "updatedAt",
  ]);

  if (flightJson.departure_date) {
    flightJson.departure_date = moment(flightJson.departure_date).format(
      "YYYY-MM-DD HH:mm"
    );
  }

  return flightJson;
};

function validateFlight(flight) {
  const schema = {
    available_seats: Joi.number().integer().min(1).required(),
    cost_per_seat: Joi.number().positive().required(),
    departure_airport: Joi.string().required(), // Assuming it's a string representation of ObjectId
    return_airport: Joi.string().required(), // Assuming it's a string representation of ObjectId
    departure_date: Joi.string().required(),
    // return_date: Joi.string().required(),
    status: Joi.boolean().required(),
    note: Joi.string().allow(null, ""),
  };
  return Joi.validate(flight, schema);
}

const Flight = mongoose.model("Flight", flightSchema);

exports.Flight = Flight;
exports.validateFlight = validateFlight;
