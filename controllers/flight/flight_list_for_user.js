const { Flight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_list = async (req, res) => {
  try {
    let departure_airport = req.body.departure_airport
      ? req.body.departure_airport
      : "";

    let departure_date = req.body.departure_date ? req.body.departure_date : "";

    let query_obj = {};
    if (departure_airport != "" && departure_date != "") {
      query_obj = {
        ...query_obj,
        departure_airport: departure_airport,
        departure_date: { $eq: new Date(departure_date) },
      };
    } else if (departure_airport != "" && departure_date == "") {
      query_obj = {
        ...query_obj,
        departure_airport: departure_airport,
        departure_date: { $gte: new Date() },
      };
    } else if (departure_airport != "" && departure_date == "") {
      query_obj = {
        ...query_obj,
        departure_date: { $eq: new Date(departure_date) },
      };
    } else {
      query_obj = {
        ...query_obj,
        departure_date: { $gte: new Date() },
      };
    }

    let flight_list = await Flight.find({
      ...query_obj,
      status: true,
    }).sort({
      departure_date: 1,
    });

    res.status(200).json({
      code: 200,
      message: "active Flight list",
      flight_list: flight_list,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_list;
