const { GuruUser } = require("../../models/member_user");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const guru_detail = async (req, res) => {
  try {
    //Check for guru ID exist or not
    var guru = await GuruUser.findById(req.params.guru_id);
    if (!guru) {
      return res
        .status(400)
        .json({ code: 400, message: "No guru exists with given ID" });
    }
    res.status(200).json({
      code: 200,
      message: "guru Detail",
      guru: guru,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = guru_detail;
