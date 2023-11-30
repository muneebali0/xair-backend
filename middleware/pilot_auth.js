const pilot_auth = (req, res, next) => {
  if (req.user.login_by === "pilot_user") {
    next();
  } else {
    res.status(401).json({
      code: 401,
      message: "Access denied ....",
    });
  }
};

module.exports = { pilot_auth };
