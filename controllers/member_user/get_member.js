const { MemberUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    let member = await MemberUser.findOne({
      _id: req.params.member_id,
    });

    if (!member) {
      return res.status(400).json({
        code: 400,
        message: "Member not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Member Detail",
      memberUser: member,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
