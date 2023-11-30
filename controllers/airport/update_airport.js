const { Airport, validateAirport } = require("../../models/airport");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const update_airport = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateAirport(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const airportId = req.params._id; // Assuming you're passing the airport ID as a route parameter

    // Find the airport by ID
    let airport = await Airport.findById(airportId);
    if (!airport) {
      return res.status(404).json({
        code: 404,
        message: "Airport not found",
      });
    }

    // Update airport object
    airport.title = req.body.title;
    airport.country_name = req.body.country_name;
    airport.city_name = req.body.city_name;
    airport.state_name = req.body.state_name;
    airport.address_1 = req.body.address_1;
    airport.address_2 = req.body.address_2;
    airport.postal_code = req.body.postal_code;
    airport.status = req.body.status;

    // Save the updated airport
    airport = await airport.save();

    res.status(200).json({
      code: 200,
      message: "Airport updated successfully",
      airport: airport,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_airport;
