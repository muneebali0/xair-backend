const { Pilot, validateEditPilot } = require("../../models/pilot");
const {
  RENDER_BAD_REQUEST,
  upload_file,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateEditPilot(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    let pilot = await Pilot.findOne({
      _id: req.params.pilot_id,
    });

    if (!pilot) {
      return res.status(400).json({
        code: 400,
        message: "Pilot not found",
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

    pilot.first_name = req.body.first_name;
    pilot.last_name = req.body.last_name;
    pilot.email = req.body.email;
    pilot.password = password;
    pilot.phone_number = req.body.phone_number;
    pilot.status = req.body.status;
    pilot.date_of_birth = req.body.date_of_birth;

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
        pilot.certificate_image = certificate_image;
      }

      console.log("certificate_image", certificate_image);

      pilot.is_certified = true;
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
        pilot.night_rating_file = night_rating_file;
      }
      pilot.have_night_rating = true;
    }

    if (req.body.airports && req.body.airports != "") {
      pilot.airports = JSON.parse(req.body.airports);
    } else {
      pilot.airports = [];
    }

    pilot = await pilot.save();
    res.status(200).json({
      code: 200,
      message: "Updated successfully",
      pilotUser: pilot,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
