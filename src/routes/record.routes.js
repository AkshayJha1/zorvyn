const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  permanentDeleteRecord,
} = require("../controllers/record.controller");

const setUserContext = require("../middleware/setUserContext");
const requireRole = require("../middleware/requireRole");
const requireActiveUser = require("../middleware/requireActiveUser");
const { validateCreateRecord, validateUpdateRecord } = require("../validators/record.validator");

router.post(
  "/",
  setUserContext,
  requireActiveUser,
  requireRole("admin"),
  validateCreateRecord,
  createRecord,
);

router.get(
  "/",
  setUserContext,
  requireActiveUser,
  requireRole("viewer", "analyst", "admin"),
  getRecords,
);

router.patch(
  "/:id",
  setUserContext,
  requireActiveUser,
  requireRole("admin"),
  validateUpdateRecord,
  updateRecord,
);

router.delete(
  "/:id",
  setUserContext,
  requireActiveUser,
  requireRole("admin"),
  deleteRecord,
);

router.delete(
  "/:id/permanent",
  setUserContext,
  requireActiveUser,
  requireRole("admin"),
  permanentDeleteRecord,
);

module.exports = router;
