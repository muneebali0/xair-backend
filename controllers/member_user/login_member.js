const {
  MemberUser,
  validateLoginMemberUser,
} = require("../../models/member_user");
const { Pilot } = require("../../models/pilot");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login_member_user = async (req, res) => {
  try {
    //validate login Request Body
    const { error } = validateLoginMemberUser(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    var user_type = "passenger";
    //check Member User Exist against this email
    var memberUser = await MemberUser.findOne({ email: req.body.email });
    var login_by = "member_user";
    if (!memberUser) {
      memberUser = await Pilot.findOne({ email: req.body.email });
      if (!memberUser) {
        return res
          .status(400)
          .json({ code: 400, message: "Invalid email or password" });
      } else {
        user_type = "pilot";
        login_by = "pilot_user";
      }
    }
    // Match Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      memberUser.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }
    //check Member status is active or not
    if (!memberUser.status) {
      return res.status(400).json({
        code: 400,
        message: "Your waites online  account Inactive.",
      });
    }
    //Genrate Authentication Token
    const token = jwt.sign(
      { _id: memberUser._id, login_by: login_by },
      process.env.JWT_SECRET
    );
    //check login user platform is web or app
    if (req.body.platform !== "web") {
      //Check this device token already exist or not
      let existDeviceToken = memberUser.tokens.filter(
        (cls) => cls.device_token === req.body.device_token
      );
      if (existDeviceToken.length === 0) {
        let device_token_obj = {
          device_token: req.body.device_token,
          platform: req.body.platform,
        };
        MemberUser.findOneAndUpdate(
          { _id: memberUser._id },
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
    memberUser.save();
    res.status(200).json({
      code: 200,
      message: "Member login successfully",
      user: memberUser,
      token: token,
      user_type: user_type,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = login_member_user;
