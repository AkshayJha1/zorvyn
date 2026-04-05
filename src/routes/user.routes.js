const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUserRole,
  updateUserStatus,
} = require("../controllers/user.controller");

const setUserContext = require("../middleware/setUserContext");
const requireRole = require("../middleware/requireRole");
const { validateCreateUser, validateRoleUpdate, validateStatusUpdate } = require("../validators/user.validator");

router.post("/", validateCreateUser, createUser);

router.get("/", setUserContext, requireRole("admin"), getUsers);

router.patch("/:id/role", setUserContext, requireRole("admin"), validateRoleUpdate, updateUserRole);

router.patch("/:id/status", setUserContext, requireRole("admin"),validateStatusUpdate, updateUserStatus);

module.exports = router;