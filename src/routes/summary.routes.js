const express = require("express");
const router = express.Router();

const {
  totalIncome,
  totalExpense,
  netBalance,
  categoryWise,
  recentActivity,
  monthlyTrends,
} = require("../controllers/summary.controller");

const setUserContext = require("../middleware/setUserContext");
const requireRole = require("../middleware/requireRole");

router.get(
  "/income",
  setUserContext,
  requireRole("analyst", "admin"),
  totalIncome
);

router.get(
  "/expense",
  setUserContext,
  requireRole("analyst", "admin"),
  totalExpense
);

router.get(
  "/balance",
  setUserContext,
  requireRole("analyst", "admin"),
  netBalance
);

router.get(
  "/category",
  setUserContext,
  requireRole("analyst", "admin"),
  categoryWise
);

router.get(
  "/recent",
  setUserContext,
  requireRole("analyst", "admin"),
  recentActivity
);

router.get(
  "/trends",
  setUserContext,
  requireRole("analyst", "admin"),
  monthlyTrends
);

module.exports = router;