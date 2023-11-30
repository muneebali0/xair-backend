const { FlightBooking } = require("../../models/flight_booking");
const { MemberUser } = require("../../models/member_user");
const { Pilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const moment  = require('moment-timezone');


const flight_list = async (req, res) => {
  try {
    let flight_booking_list = await FlightBooking.find({})
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

    let members = await MemberUser.find({}).lean();
    let pilots = await Pilot.find({}).lean();

    flight_booking_list.forEach((element) => {
      let member_user = {};
      if (element.booked_by_id) {
        if (element.booked_by == "member_user") {
          member_user = members.find(
            (member) => member._id.toString() == element.booked_by_id.toString()
          );
        } else if (element.booked_by == "pilot") {
          member_user = pilots.find(
            (pilot) => pilot._id.toString() == element.booked_by_id.toString()
          );
        }
      }
      element.booked_by = member_user;
    });

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
