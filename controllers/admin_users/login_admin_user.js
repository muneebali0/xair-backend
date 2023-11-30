const {
  AdminUser,
  validateAdminUserLogin,
} = require("../../models/admin_users");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login_admin_user = async (req, res) => {
  try {
    //validate login Request Body
    const { error } = validateAdminUserLogin(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }
    //check Admin User Exist against this email
    let adminUser = await AdminUser.findOne({ email: req.body.email });
    if (!adminUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }
    // Match Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      adminUser.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }
    //Genrate Authentication Token
    const token = jwt.sign(
      { _id: adminUser._id, login_by: "admin_user" },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      code: 200,
      message: "Admin login successfully",
      adminUser: adminUser,
      token: token,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = login_admin_user;
