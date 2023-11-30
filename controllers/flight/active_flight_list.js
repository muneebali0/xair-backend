const { Flight, validateFlight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_list = async (req, res) => {
  try {
    let flight_list = await Flight.find({ status: 1 })
      .sort({
        departure_date: 1,
      })
      .populate("departure_airport", "title")
      .populate("return_airport", "title");

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
