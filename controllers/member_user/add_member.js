const { MemberUser, validateMemberUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
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
      // sirport: req.body.date_of_birth,
    };

    // if (req.body.airports && req.body.airports.length > 0) {
    //   member_user_obj.airports = req.body.airports;
    // }

    let memberUser = new MemberUser(member_user_obj);

    memberUser = await memberUser.save();
    res.status(200).json({
      code: 200,
      message: "Added successfully",
      memberUser: memberUser,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
