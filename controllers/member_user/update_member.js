const {
  MemberUser,
  validateEditMemberUser,
} = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateEditMemberUser(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    let member = await MemberUser.findOne({
      _id: req.params.member_id,
    });

    if (!member) {
      return res.status(400).json({
        code: 400,
        message: "Member not found",
      });
    }

    // Genrate Random 6 digit Code
    password = req.body.password;
    user_password = password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    member.first_name = req.body.first_name;
    member.last_name = req.body.last_name;
    member.email = req.body.email;
    member.password = password;
    member.phone_number = req.body.phone_number;
    member.status = req.body.status;
    member.date_of_birth = req.body.date_of_birth;
    // member.airport = req.body.airport;

    // if (req.body.airports && req.body.airports.length > 0) {
    //   member.airports = req.body.airports;
    // } else {
    //   member.airports = [];
    // }

    member = await member.save();
    res.status(200).json({
      code: 200,
      message: "Updated successfully",
      memberUser: member,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
