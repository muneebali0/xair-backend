const { FlightBooking } = require("../../models/flight_booking");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const moment  = require('moment-timezone');


const flight_list = async (req, res) => {
  try {
    let flight_booking_list = await FlightBooking.find({
      booked_by_id: req.customer._id,
    })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "flight_id",
        populate: [
          {
            path: "departure_airport",
          },
          {
            path: "return_airport",
          },
        ],
      }).lean();

    flight_booking_list = flight_booking_list.map((booking) => {
      if (booking.flight_id) {
        // Check if flight_id is populated
        const formattedDepartureDate = moment(
          booking.flight_id.departure_date
        ).format("YYYY-MM-DD HH:mm");
        booking.flight_id.departure_date = formattedDepartureDate;
      }
      return booking;
    });

    res.status(200).json({
      code: 200,
      message: "Flight list",
      flight_booking_list: flight_booking_list,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_list;
