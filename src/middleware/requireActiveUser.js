const requireActiveUser = (req, res, next) => {
  if (req.user.status !== "active") {
    return res.status(403).json({
      message: "User account is inactive",
    });
  }

  next();
};

module.exports = requireActiveUser;