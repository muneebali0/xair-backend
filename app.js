require("./config/config");
require("./db/mongoose");
const express = require("express");
const moment = require("moment-timezone");
const logger = require("morgan");
const path = require("path");
const cron = require("node-cron");
const app = express();
const { EVENT_REMINDER } = require("./controllers/common/utils");
app.use(express.static(path.join(__dirname)));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
logger.token("date", (req, res, tz) => {
  return moment().tz("EST").format("DD-MM-YYYY hh:mm:ss A");
});
logger.format(
  "dev",
  '[:date[Asia/Taipei]] ":method :url" :status :res[content-length] - :response-time ms'
);
app.use(logger("dev"));
/*** Main Routes File *****/
require("./routes/start_up_routes")(app);

module.exports = app;
