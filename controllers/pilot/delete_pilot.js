const { Pilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    let pilot = await Pilot.findOne({
      _id: req.params.pilot_id,
    });

    if (!pilot) {
      return res.status(400).json({
        code: 400,
        message: "pilot not found",
      });
    }

    await Pilot.deleteOne({
      _id: req.params.pilot_id,
    });

    res.status(200).json({
      code: 200,
      message: "Pilot Deleted",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
