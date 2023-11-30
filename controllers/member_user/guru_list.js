const { GuruUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const guru_list = async (req, res) => {
  try {
    var guru = await GuruUser.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Guru List",
      guruUser: guru,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = guru_list;
