const { Flight, validateFlight } = require("../../models/flight");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const update_flight = async (req, res) => {
  try {
    const { error } = validateFlight(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    const flightId = req.params.flight_id;
    // const updatedFlightData = req.body;

    let flight = await Flight.findOne({ _id: flightId });

    if (!flight) {
      return res.status(400).json({
        code: 400,
        message: "flight not exist",
      });
    }

    flight.available_seats = req.body.available_seats;
    flight.cost_per_seat = req.body.cost_per_seat;
    flight.total_cost = req.body.cost_per_seat * req.body.available_seats;
    // flight.return_date = req.body.return_date;
    flight.departure_date = req.body.departure_date;

    flight.return_airport = req.body.return_airport;
    flight.departure_airport = req.body.departure_airport;
    flight.note = req.body.note;

    flight = await flight.save();

    res.status(200).json({
      code: 200,
      message: "Flight Updated successfully",
      flight: flight,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_flight;
