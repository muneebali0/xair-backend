const { GuruUser, validateEditGuruUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const update_guru = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateEditGuruUser(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    // check duplication for email
    const existingGuru = await GuruUser.findOne({
      email: req.body.email,
      _id: { $ne: req.params.guru_id },
    });
    if (existingGuru) {
      return res.status(400).json({
        code: 400,
        message: "guru with same email already exists",
      });
    }
    //Check for guru ID exist or not
    var guru = await GuruUser.findById(req.params.guru_id);
    if (!guru) {
      return res
        .status(400)
        .json({ code: 400, message: "No guru exists with given ID" });
    }
    //Update guru
    guru.first_name = req.body.first_name;
    guru.last_name = req.body.last_name;
    guru.email = req.body.email;
    guru.address = req.body.address;
    guru.city = req.body.city;
    guru.contact_number = req.body.contact_number;
    guru.state = req.body.state;
    (guru.image = req.body.image), (guru.biography = req.body.biography);

    guru.subject_one = req.body.subject_one;
    guru.subject_two = req.body.subject_two;
    guru.guru_level = req.body.guru_level;
    guru.hourly_rate = req.body.hourly_rate;
    guru.country = req.body.country;
    guru.time_zone = req.body.time_zone;
    guru.dob = req.body.dob;

    const result = await guru.save();
    res.status(200).json({
      code: 200,
      message: "guru update successfully",
      guruUser: result,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_guru;
