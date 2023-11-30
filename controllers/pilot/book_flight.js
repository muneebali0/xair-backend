const { FlightBooking } = require("../../models/flight_booking");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const { MemberUser } = require("../../models/member_user");
const { Pilot } = require("../../models/pilot");

const add_flight = async (req, res) => {
  try {
    let stripe = require("stripe")(
      "sk_test_51H5oCHABdULnSQcqcX7yXmEZxighHm2hPD3tLlk5Emyyg5i5Yf5GUCmIlHcPlsYgGa7lzeg76iEmpIHszb70G3CK00TkNO4nrR"
    );
    const { availableSeats, totalCost } = req.body;
    const commissionRate = 0.2;

    // Calculate passenger cost and payouts
    const increasedCost = totalCost * (1 + commissionRate);
    const passengerCost = increasedCost / availableSeats; // Including pilot
    const pilotPayout = totalCost;
    const xairPayout = increasedCost - pilotPayout;

    const flightObj = {
      passengers: req.body.passengers,
      pilot: req.body.pilot,
      availableSeats: availableSeats,
      totalCost: totalCost,
      passengerCost: passengerCost,
      pilotPayout: pilotPayout,
      xairPayout: xairPayout,
    };

    const flight = new FlightBooking(flightObj);

    let filght_data = await flight.save();

    let members_data = await MemberUser.find(
      {
        _id: { $in: req.body.passengers.map((passenger) => passenger._id) },
      },
      { first_name: 1, last_name: 1, email: 1, phone_number: 1 }
    );

    let pilot_data = await Pilot.findOne(
      { _id: req.customer._id },
      { first_name: 1, last_name: 1, email: 1, phone_number: 1 }
    );

    paymentIntent = await stripe.paymentIntents.create({
      amount: increasedCost * 100,
      currency: "usd",
      payment_method_types: ["card"],
      description: "Flight Booking",
      metadata: {
        passengers: JSON.stringify(members_data),
        pilot: JSON.stringify(pilot_data),
      },
    });

    res.status(200).json({
      code: 200,
      message: "Booking details added successfully",
      flight: filght_data,
      client_secret: paymentIntent.client_secret,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_flight;
