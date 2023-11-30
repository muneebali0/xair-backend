const { Flight, validateFlight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_list = async (req, res) => {
  try {
    let flight_list = await Flight.find({ pilot: req.customer._id })
      .sort({
        departure_date: 1,
      })
      .populate("departure_airport")
      .populate("return_airport");

    res.status(200).json({
      code: 200,
      message: "Flight list",
      flight_list: flight_list,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_list;
