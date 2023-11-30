const jwt = require("jsonwebtoken");
const { AdminUser } = require("../models/admin_users");
const { MemberUser } = require("../models/member_user");
const { Pilot } = require("../models/pilot");
const authenticate = async (req, res, next) => {
  const token = req.header("x-sh-auth");
  if (!token) {
    res.status(401).json({
      code: 401,
      message: "Access denied .... No token Provided",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.token = token;
      req.user = decoded;
      if (req.user.login_by === "admin_user") {
        var adminUser = await AdminUser.findById(req.user._id);
        if (!adminUser) {
          return res.status(401).json({
            code: 401,
            message: "Access denied .... No token Provided",
          });
        } else {
          req.customer = adminUser;
        }
      } else if (req.user.login_by === "member_user") {
        var member = await MemberUser.findById(req.user._id);
        if (member) {
          req.customer = member;
          if (!member.status) {
            return res.status(401).json({
              code: 401,
              message: "Access denied .... No token Provided",
            });
          }
        } else {
          return res.status(401).json({
            code: 401,
            message: "Access denied .... No token Provided",
          });
        }
      } else {
        var member = await Pilot.findById(req.user._id);
        if (member) {
          req.customer = member;
          if (!member.status) {
            return res.status(401).json({
              code: 401,
              message: "Access denied .... No token Provided",
            });
          }
        } else {
          return res.status(401).json({
            code: 401,
            message: "Access denied .... No token Provided",
          });
        }
      }
      next();
    } catch (ex) {
      //console.log(ex,"Invalid Token")
      res.status(401).json({
        code: 401,
        message: "Invalid Token",
      });
    }
  }
};

module.exports = { authenticate };
