const { FlightBooking } = require("../../models/flight_booking");
const { MemberUser } = require("../../models/member_user");
const { Pilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const flight_list = async (req, res) => {
  try {
    let flight_booking = await FlightBooking.findOne({
      _id: req.params.booking_id,
    })
      .populate("flight_id")
      .lean();

    if (!flight_booking) {
      return res.status(400).json({
        code: 400,
        message: "Booking Not found",
      });
    }

    if (flight_booking.booked_by == "member_user") {
      var member_user = await MemberUser.findOne({
        _id: flight_booking.booked_by_id,
      });
    } else if (flight_booking.booked_by == "pilot") {
      var member_user = await Pilot.findOne({
        _id: flight_booking.booked_by_id,
      });
    }

    flight_booking.booked_by = member_user;
    res.status(200).json({
      code: 200,
      message: "Booking Details",
      flight_booking: flight_booking,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = flight_list;
