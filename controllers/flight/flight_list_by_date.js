const { Flight, validateFlight } = require("../../models/flight");
const { FlightBooking } = require("../../models/flight_booking");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const moment = require("moment-timezone");

const flight_list = async (req, res) => {
  try {
    let date = req.body.date
      ? moment(req.body.date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    let flight_list = await Flight.find({
      status: 1,
    })
      .sort({
        departure_date: 1,
      })
      .populate("departure_airport")
      .populate("return_airport");

    let flight_list_array = [];

    let booked_flights = await FlightBooking.find({ status: "confirmed" });

    for (let i = 0; i < flight_list.length; i++) {
      let flight = flight_list[i];
      let booked_seats = 0;
      for (let j = 0; j < booked_flights.length; j++) {
        let booked_flight = booked_flights[j];
        if (booked_flight.flight_id.toString() == flight._id.toString()) {
          booked_seats += booked_flight.seats_booked;
        }
      }
      flight.available_seats = flight.available_seats - booked_seats;

      if (
        moment(flight.departure_date).format("YYYY-MM-DD").toString() ==
        date.toString()
      ) {
        if (flight.available_seats > 0) flight_list_array.push(flight);
      }
    }

    res.status(200).json({
      code: 200,
      message: "Flight list",
      flight_list: flight_list_array,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_list;
