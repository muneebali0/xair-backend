const express = require("express");
const router = express.Router();
var environment = "";
if (process.env.NODE_ENV === "") {
  environment = "local";
} else {
  environment = process.env.NODE_ENV;
}
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "STS App Backend ",
    environment: environment,
  });
});

module.exports = router;
