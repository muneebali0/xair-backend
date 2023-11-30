const { Flight, validateFlight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_flight = async (req, res) => {
  try {
    const { error } = validateFlight(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    const {
      available_seats,
      cost_per_seat,
      departure_airport,
      return_airport,
      departure_date,
      // return_date,
      note,
    } = req.body;

    let total_cost = available_seats * cost_per_seat;

    const flightObj = {
      pilot: req.customer._id,
      available_seats,
      cost_per_seat,
      total_cost,
      departure_airport,
      return_airport,
      departure_date,
      note,
      // return_date,
    };

    const flight = new Flight(flightObj);
    const savedFlight = await flight.save();

    res.status(200).json({
      code: 200,
      message: "Flight added successfully",
      flight: savedFlight,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_flight;
