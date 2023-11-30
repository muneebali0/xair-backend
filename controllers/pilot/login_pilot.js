const { Pilot, validateLoginPilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login_member_user = async (req, res) => {
  try {
    //validate login Request Body
    const { error } = validateLoginPilot(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    //check Member User Exist against this email
    let pilot = await Pilot.findOne({ email: req.body.email });
    if (!pilot) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }
    // Match Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      pilot.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }
    //check Member status is active or not
    if (!pilot.status) {
      return res.status(400).json({
        code: 400,
        message: "Your waites online  account Inactive.",
      });
    }
    //Genrate Authentication Token
    const token = jwt.sign(
      { _id: pilot._id, login_by: "pilot_user" },
      process.env.JWT_SECRET
    );
    //check login user platform is web or app
    if (req.body.platform !== "web") {
      //Check this device token already exist or not
      let existDeviceToken = pilot.tokens.filter(
        (cls) => cls.device_token === req.body.device_token
      );
      if (existDeviceToken.length === 0) {
        let device_token_obj = {
          device_token: req.body.device_token,
          platform: req.body.platform,
        };
        pilot.findOneAndUpdate(
          { _id: pilot._id },
          {
            $push: { tokens: device_token_obj },
          },
          { new: true },
          function (err, doc) {
            //console.log(err,doc)
          }
        );
      }
    }
    pilot.save();
    res.status(200).json({
      code: 200,
      message: "Pilot login successfully",
      user: pilot,
      token: token,
      user_type: "pilot",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = login_member_user;
