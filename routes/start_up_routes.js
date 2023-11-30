const express = require("express");
const cors = require("cors");
const path = require("path");
const moment = require("moment-timezone");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

/****************************
 ******Routes Initialize******
 ****************************/
const index = require("./index");
const admin_users = require("./admin_users");
const member_user = require("./member_user");
const pilot = require("./pilot");
const payment_plan = require("./payment_plan");
const airport = require("./airport");
const flight = require("./flight");

module.exports = function (app) {
  /****** Added ********/

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname)));
  app.use(cookieParser());
  app.use(cors());
  app.use(fileUpload());

  /****************************
   *** Routes Use in Express ***
   ****************************/

  app.use("/", index);
  app.use("/admin_users", admin_users);
  app.use("/api/member", member_user);
  app.use("/api/pilot", pilot);
  app.use("/api/payment_plan", payment_plan);
  app.use("/api/airport", airport);
  app.use("/api/flight", flight);
};
