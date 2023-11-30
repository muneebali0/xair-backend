const { Pilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const get_pilots = async (req, res) => {
  try {
    let pilots = await Pilot.find({});

    res.status(200).json({
      code: 200,
      message: "Pilot List",
      pilot_list: pilots,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_pilots;
