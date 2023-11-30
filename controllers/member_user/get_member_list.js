const { MemberUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    let members = await MemberUser.find({});

    res.status(200).json({
      code: 200,
      message: "Member List",
      member_list: members,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
