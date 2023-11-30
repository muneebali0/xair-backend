const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

const add_member = require("../controllers/member_user/add_member");
const signup_member = require("../controllers/member_user/signup_member");
const update_member = require("../controllers/member_user/update_member");
const get_member = require("../controllers/member_user/get_member");
const get_member_list = require("../controllers/member_user/get_member_list");

const login_member = require("../controllers/member_user/login_member");
const delete_member = require("../controllers/member_user/delete_member");

register_route({
  router,
  route: "/add",
  auth_required: false,
  post_method: add_member,
});

register_route({
  router,
  route: "/signup",
  auth_required: false,
  post_method: signup_member,
});

register_route({
  router,
  route: "/update/:member_id",
  auth_required: false,
  put_method: update_member,
});

register_route({
  router,
  route: "/get_member/:member_id",
  auth_required: false,
  get_method: get_member,
});

register_route({
  router,
  route: "/get_member_list",
  auth_required: false,
  get_method: get_member_list,
});

register_route({
  router,
  route: "/login",
  auth_required: false,
  post_method: login_member,
});

register_route({
  router,
  route: "/delete/:member_id",
  auth_required: false,
  delete_method: delete_member,
});

module.exports = router;
