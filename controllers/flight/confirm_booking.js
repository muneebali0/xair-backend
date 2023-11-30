const {
  FlightBooking,
  validateConfirmBooking,
} = require("../../models/flight_booking");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_booking = async (req, res) => {
  try {
    const { error } = validateConfirmBooking(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message,
      });
    }
    let booked_flight = await FlightBooking.findOne({
      _id: req.body.booking_id,
    });

    if (!booked_flight) {
      return res.status(400).json({
        code: 400,
        message: "Flight Not found",
      });
    }

    booked_flight.status = "confirmed";
    booked_flight.payment_status = "paid";

    let filght_data = await booked_flight.save();

    res.status(200).json({
      code: 200,
      message: "Booking successfull",
      flight: filght_data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_booking;
