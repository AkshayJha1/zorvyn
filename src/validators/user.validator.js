const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Valid name is required",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  next();
};

const validateRoleUpdate = (req, res, next) => {
  const { role } = req.body;

  const allowedRoles = ["viewer", "analyst", "admin"];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  next();
};

const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;

  const allowedStatus = ["active", "inactive"];

  if (!status || !allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateRoleUpdate,
  validateStatusUpdate,
};