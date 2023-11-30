const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

const add_plan = require("../controllers/payment_plan/add_plan");
const update_plan = require("../controllers/payment_plan/update_plan");
const get_payment_plan = require("../controllers/payment_plan/get_payment_plan");
const get_plan_list = require("../controllers/payment_plan/get_plan_list");
const delete_plan = require("../controllers/payment_plan/delete_plan");

register_route({
  router,
  route: "/add",
  auth_required: false,
  post_method: add_plan,
});

register_route({
  router,
  route: "/update/:plan_id",
  auth_required: false,
  put_method: update_plan,
});

register_route({
  router,
  route: "/get/:plan_id",
  auth_required: false,
  get_method: get_payment_plan,
});

register_route({
  router,
  route: "/list",
  auth_required: false,
  get_method: get_plan_list,
});

register_route({
  router,
  route: "/delete/:plan_id",
  auth_required: false,
  delete_method: delete_plan,
});

module.exports = router;
