const { Flight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_detail = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.flight_id);

    res.status(200).json({
      code: 200,
      message: "Flight Detail",
      flight: flight,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_detail;
