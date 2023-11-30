const { Airport, validateAirport } = require("../../models/airport");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_airport = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateAirport(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    // Create airport object
    const airportObj = {
      title: req.body.title,
      country_name: req.body.country_name,
      city_name: req.body.city_name,
      state_name: req.body.state_name,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      postal_code: req.body.postal_code,
      status: req.body.status,
    };

    // Create a new Airport instance
    let airport = new Airport(airportObj);

    // Save the new airport
    airport = await airport.save();

    res.status(200).json({
      code: 200,
      message: "Airport added successfully",
      airport: airport,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_airport;
