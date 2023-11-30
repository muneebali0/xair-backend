const { Pilot, validatePilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_pilot = async (req, res) => {
  try {
    // validate the request body
    const { error } = validatePilot(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    const existingPilot = await Pilot.findOne({
      email: req.body.email,
    });
    if (existingPilot) {
      return res.status(400).json({
        code: 400,
        message: "User with same email already exists",
      });
    }

    // Genrate Random 6 digit Code
    password = req.body.password;
    user_password = password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let pilot_obj = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      phone_number: req.body.phone_number,
      status: req.body.status,
      date_of_birth: req.body.date_of_birth,
      certificate_image: req.body.certificate_image,
      is_certified: req.body.is_certified,
    };

    if (req.body.airports && req.body.airports.length > 0) {
      pilot_obj.airports = req.body.airports;
    }

    let pilot = new Pilot(pilot_obj);

    pilot = await pilot.save();
    res.status(200).json({
      code: 200,
      message: "Added successfully",
      user: pilot,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_pilot;
