const express = require("express");
const router = express.Router();

const { insights } = require("../controllers/insights.controller");

const setUserContext = require("../middleware/setUserContext");
const requireRole = require("../middleware/requireRole");

router.get(
  "/",
  setUserContext,
  requireRole("analyst", "admin"),
  insights
);

module.exports = router;