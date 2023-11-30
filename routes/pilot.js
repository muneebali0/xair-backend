const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

const add_pilot = require("../controllers/pilot/add_pilot");
const signup_pilot = require("../controllers/pilot/signup_pilot");
const update_pilot = require("../controllers/pilot/update_pilot");
const get_pilot = require("../controllers/pilot/get_pilot");
const get_pilot_list = require("../controllers/pilot/get_pilot_list");

const login_pilot = require("../controllers/pilot/login_pilot");
const delete_pilot = require("../controllers/pilot/delete_pilot");
const book_flight = require("../controllers/pilot/book_flight");

register_route({
  router,
  route: "/add",
  auth_required: false,
  post_method: add_pilot,
});

register_route({
  router,
  route: "/signup",
  auth_required: false,
  post_method: signup_pilot,
});

register_route({
  router,
  route: "/update/:pilot_id",
  auth_required: false,
  put_method: update_pilot,
});

register_route({
  router,
  route: "/get_pilot/:pilot_id",
  auth_required: false,
  get_method: get_pilot,
});

register_route({
  router,
  route: "/get_pilot_list",
  auth_required: false,
  get_method: get_pilot_list,
});

register_route({
  router,
  route: "/delete/:pilot_id",
  auth_required: false,
  delete_method: delete_pilot,
});

register_route({
  router,
  route: "/login",
  auth_required: false,
  post_method: login_pilot,
});

register_route({
  router,
  route: "/book_flight",
  auth_required: true,
  post_method: book_flight,
});

module.exports = router;
