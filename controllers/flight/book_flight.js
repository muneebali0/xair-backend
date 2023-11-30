const {
  FlightBooking,
  validateBooking,
} = require("../../models/flight_booking");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const { MemberUser } = require("../../models/member_user");
const { Pilot } = require("../../models/pilot");
const { Flight } = require("../../models/flight");
const stripe = require("stripe")(
  "sk_test_51H5oCHABdULnSQcqcX7yXmEZxighHm2hPD3tLlk5Emyyg5i5Yf5GUCmIlHcPlsYgGa7lzeg76iEmpIHszb70G3CK00TkNO4nrR"
);

const add_booking = async (req, res) => {
  try {
    const { error } = validateBooking(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message,
      });
    }

    var member_user;
    console.log(req.user);
    if (req.user.login_by == "member_user") {
      member_user = await MemberUser.findOne({ _id: req.user._id });
      // console.log(member_user);
      if (!member_user) {
        return res.status(400).json({
          code: 400,
          message: "User Not found",
        });
      }
    } else if (req.user.login_by == "pilot_user") {
      member_user = await Pilot.findOne({ _id: req.user._id });
      if (!member_user) {
        return res.status(400).json({
          code: 400,
          message: "User Not found",
        });
      }
    } else {
      return res.status(400).json({
        code: 400,
        message: "User Not found",
      });
    }

    let flight = await Flight.findOne({
      _id: req.body.flight_id,
    });

    if (!flight) {
      return res.status(400).json({
        code: 400,
        message: "Flight Not found",
      });
    }

    let booked_flights = await FlightBooking.find({
      flight_id: req.body.flight_id,
      status: "confirmed",
    });

    let booked_seats = 0;
    for (let i = 0; i < booked_flights.length; i++) {
      booked_seats += booked_flights[i].seats_booked;
    }

    if (flight.available_seats < req.body.seats_booked) {
      return res.status(400).json({
        code: 400,
        message:
          "Only " +
          (Number(flight.available_seats) - booked_seats) +
          " seats are available in this flight",
      });
    }

    let total_amount = flight.cost_per_seat * req.body.seats_booked;

    paymentIntent = await stripe.paymentIntents.create({
      amount: total_amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
      description: "Flight Booking",
      metadata: {
        booked_by: member_user.first_name + " " + member_user.last_name,
        email: member_user.email,
      },
    });
    let booking_obj = {
      booked_by_id: member_user._id,
      booked_by: req.user.login_by,
      seats_booked: req.body.seats_booked,
      per_passenger_cost: flight.cost_per_seat,
      total_cost: total_amount,
      flight_id: flight._id,
      payment_status: "pending",
    };

    let filght_data = new FlightBooking(booking_obj);
    filght_data = await filght_data.save();

    res.status(200).json({
      code: 200,
      message: "Booking added successfully",
      flight: filght_data,
      client_secret: paymentIntent.client_secret,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_booking;
