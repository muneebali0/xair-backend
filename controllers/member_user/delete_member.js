const { MemberUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_member = async (req, res) => {
  try {
    let memberUser = await MemberUser.findOne({
      _id: req.params.member_id,
    });

    if (!memberUser) {
      return res.status(400).json({
        code: 400,
        message: "Member not exists!",
      });
    }

    await MemberUser.deleteOne({
      _id: req.params.member_id,
    });

    res.status(200).json({
      code: 200,
      message: "Member Deleted",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
