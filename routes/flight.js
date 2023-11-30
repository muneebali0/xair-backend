const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

const add_flight = require("../controllers/flight/add_flight");
const update_flight = require("../controllers/flight/update_flight");
const flight_list = require("../controllers/flight/flight_list");
const active_flight_list = require("../controllers/flight/active_flight_list");
const flight_list_by_pilot = require("../controllers/flight/flight_list_by_pilot");
const get_flight = require("../controllers/flight/get_flight");
const delete_flight = require("../controllers/flight/delete_flight");
const flight_list_for_user = require("../controllers/flight/flight_list_for_user");

const flight_list_by_date = require("../controllers/flight/flight_list_by_date");
const book_flight = require("../controllers/flight/book_flight");
const confirm_booking = require("../controllers/flight/confirm_booking");
const booking_list = require("../controllers/flight/booking_list");
const booking_details = require("../controllers/flight/booking_details");
const booking_list_for_member = require("../controllers/flight/booking_list_for_member");

register_route({
  router,
  route: "/add",
  auth_required: true,
  post_method: add_flight,
});

register_route({
  router,
  route: "/update/:flight_id",
  auth_required: true,
  put_method: update_flight,
});

register_route({
  router,
  route: "/list",
  auth_required: true,
  get_method: flight_list,
});

register_route({
  router,
  route: "/active-list",
  auth_required: true,
  get_method: active_flight_list,
});

register_route({
  router,
  route: "/list-by-pilot/",
  auth_required: true,
  get_method: flight_list_by_pilot,
});

register_route({
  router,
  route: "/get/:flight_id",
  auth_required: true,
  get_method: get_flight,
});

register_route({
  router,
  route: "/delete/:flight_id",
  auth_required: true,
  delete_method: delete_flight,
});

register_route({
  router,
  route: "/list-for-user",
  auth_required: true,
  post_method: flight_list_for_user,
});

register_route({
  router,
  route: "/list/for_website",
  auth_required: false,
  post_method: flight_list_by_date,
});

register_route({
  router,
  route: "/book_flight",
  auth_required: true,
  post_method: book_flight,
});

register_route({
  router,
  route: "/booking/confirm",
  auth_required: true,
  post_method: confirm_booking,
});

register_route({
  router,
  route: "/booking/list",
  auth_required: true,
  get_method: booking_list,
});

register_route({
  router,
  route: "/booking/list/member",
  auth_required: true,
  get_method: booking_list_for_member,
});

register_route({
  router,
  route: "/booking/details/:booking_id",
  auth_required: true,
  get_method: booking_details,
});

module.exports = router;
