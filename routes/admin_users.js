const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");
const add_admin_user = require("../controllers/admin_users/add_admin_user");
const login_admin_user = require("../controllers/admin_users/login_admin_user");

register_route({
  router,
  route: "/",
  post_method: login_admin_user,
});

register_route({
  router,
  route: "/add_admin_user",
  auth_required: false,
  admin_auth_required: false,
  post_method: add_admin_user,
});

module.exports = router;
