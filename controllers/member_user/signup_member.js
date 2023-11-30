const { MemberUser, validateMemberUser } = require("../../models/member_user");
const { Pilot, validatePilot } = require("../../models/pilot");
const {
  RENDER_BAD_REQUEST,
  upload_file,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    if (req.body.user_type == "passenger") {
      // validate the request body
      const { error } = validateMemberUser(req.body);
      if (error) {
        return res.status(400).json({
          code: 400,
          message: error.details[0].message.replace(/\"/g, ""),
        });
      }
      const existingMember = await MemberUser.findOne({
        email: req.body.email,
      });
      if (existingMember) {
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

      let member_user_obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: password,
        phone_number: req.body.phone_number,
        status: req.body.status,
        date_of_birth: req.body.date_of_birth,
        airport: req.body.airport,
      };

      // if (req.body.airports && req.body.airports.length > 0) {
      //   member_user_obj.airports = req.body.airports;
      // }

      let memberUser = new MemberUser(member_user_obj);

      memberUser = await memberUser.save();

      const token = jwt.sign(
        { _id: memberUser._id, login_by: "member_user" },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        code: 200,
        message: "Added successfully",
        user: memberUser,
        token: token,
        user_type: "passenger",
      });
    } else {
      // console.log("req.body", req.files);

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

      if (req.body.is_certified == true || req.body.is_certified == "true") {
        if (!req.files.certificate_image) {
          return res.status(400).json({
            code: 400,
            message: "certificate_image is required",
          });
        }
      }

      if (
        req.body.have_night_rating == true ||
        req.body.have_night_rating == "true"
      ) {
        if (!req.files.night_rating_file) {
          return res.status(400).json({
            code: 400,
            message: "night_rating_file is required",
          });
        }
      }

      let resp = {
        error: false,
        file_path: "",
      };

      let pilot_obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: password,
        phone_number: req.body.phone_number,
        status: req.body.status,
        date_of_birth: req.body.date_of_birth,
      };

      console.log("req.body.is_certified", req.body.is_certified);

      if (req.body.is_certified == "true" || req.body.is_certified == true) {
        let certificate_image = await upload_file(
          req.files.certificate_image,
          "uploads/",
          resp
        );
        if (certificate_image.error == true) {
          return res.status(400).json({
            code: 400,
            message: "Error in uploading certificate_image",
          });
        } else {
          pilot_obj.certificate_image = certificate_image;
        }

        pilot_obj.is_certified = true;
      }

      if (
        req.body.have_night_rating == "true" ||
        req.body.have_night_rating == true
      ) {
        console.log("req.files.night_rating_file", req.files.night_rating_file);
        let night_rating_file = await upload_file(
          req.files.night_rating_file,
          "uploads/",
          resp
        );
        console.log("night_rating_file", night_rating_file);

        if (night_rating_file.error == true) {
          return res.status(400).json({
            code: 400,
            message: "Error in uploading night_rating_file",
          });
        } else {
          pilot_obj.night_rating_file = night_rating_file;
        }

        pilot_obj.have_night_rating = true;
      }

      if (req.body.airports && req.body.airports != "") {
        pilot_obj.airports = JSON.parse(req.body.airports);
      }

      console.log("pilot_obj", pilot_obj);

      let pilot = new Pilot(pilot_obj);

      pilot = await pilot.save();

      const token = jwt.sign(
        { _id: pilot._id, login_by: "pilot_user" },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        code: 200,
        message: "Added successfully",
        user: pilot,
        token: token,
        user_type: "pilot",
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
