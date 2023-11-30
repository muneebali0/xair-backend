const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

const add_airport = require("../controllers/airport/add_airport");
const update_airport = require("../controllers/airport/update_airport");
const get_airport = require("../controllers/airport/get_airport");
const get_airport_list = require("../controllers/airport/get_airport_list");
const get_airport_list_general = require("../controllers/airport/get_airport_list_general");

const delete_airport = require("../controllers/airport/delete_airport");

register_route({
  router,
  route: "/add",
  auth_required: false,
  post_method: add_airport,
});

register_route({
  router,
  route: "/update/:_id",
  auth_required: false,
  put_method: update_airport,
});

register_route({
  router,
  route: "/get_airport/:_id",
  auth_required: false,
  get_method: get_airport,
});

register_route({
  router,
  route: "/get_airport_list",
  auth_required: false,
  get_method: get_airport_list,
});

register_route({
  router,
  route: "/get_airport_list/active",
  auth_required: false,
  get_method: get_airport_list_general,
});

register_route({
  router,
  route: "/delete/:_id",
  auth_required: false,
  delete_method: delete_airport,
});

module.exports = router;
