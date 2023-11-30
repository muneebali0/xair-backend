const { Airport } = require("../../models/airport");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const get_airport = async (req, res) => {
  try {
    const airportId = req.params._id; // Assuming you're passing the airport ID as a route parameter

    // Find the airport by ID
    const airport = await Airport.findById(airportId);
    if (!airport) {
      return res.status(404).json({
        code: 404,
        message: "Airport not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Airport retrieved successfully",
      airport: airport,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_airport;
