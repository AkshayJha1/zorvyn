const User = require("../models/user.model");

const setUserContext = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "User ID is required in headers",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
      status: user.status,
    };

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = setUserContext;