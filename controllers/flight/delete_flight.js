const { Flight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_detail = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.flight_id);

    if (!flight) {
      return res.send(400).json({
        code: 400,
        message: "Flight not found",
      });
    }

    await Flight.deleteOne({ _id: req.params.flight_id });

    res.status(200).json({
      code: 200,
      message: "Flight Deleted",
      flight: flight,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_detail;
