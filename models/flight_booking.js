const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");
const e = require("express");

const flightBookingSchema = new mongoose.Schema({
  booked_by_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  booked_by: {
    type: String,
  },
  seats_booked: {
    type: Number,
    required: true,
  },
  per_passenger_cost: {
    type: Number,
    required: true,
  },
  total_cost: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  flight_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  status: {
    type: String,
    default: "pending",
  },
});

flightBookingSchema.plugin(timestamps);

flightBookingSchema.methods.toJSON = function () {
  const flightBooking = this;
  const flightBookingObject = flightBooking.toObject();
  const flightBookingJson = _.pick(flightBookingObject, [
    "_id",
    "booked_by_id",
    "booked_by",
    "seats_booked",
    "per_passenger_cost",
    "total_cost",
    "payment_status",
    "flight_id",
    "status",
    "createdAt",
    "updatedAt",
  ]);
  return flightBookingJson;
};

function validateBooking(flightBooking) {
  const schema = Joi.object({
    seats_booked: Joi.number().required(),
    flight_id: Joi.string().required(),
  });
  return schema.validate(flightBooking);
}

function validateConfirmBooking(flightBooking) {
  const schema = Joi.object({
    booking_id: Joi.string().required(),
  });
  return schema.validate(flightBooking);
}

const FlightBooking = mongoose.model("FlightBooking", flightBookingSchema);

exports.FlightBooking = FlightBooking;
exports.validateBooking = validateBooking;
exports.validateConfirmBooking = validateConfirmBooking;
