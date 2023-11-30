const { GuruUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_guru = async (req, res) => {
  try {
    //Check for guru ID exist or not
    var guru = await GuruUser.findByIdAndDelete(req.params.guru_id);
    if (!guru) {
      return res
        .status(400)
        .json({ code: 400, message: "No guru exists with given ID" });
    }
    res.status(200).json({
      code: 200,
      message: "guru deleted successfully",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_guru;
