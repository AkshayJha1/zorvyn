const summaryService = require("../services/summary.service");

const totalIncome = async (req, res) => {
  try {
    const data = await summaryService.getTotalIncome();
    res.status(200).json({ totalIncome: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const totalExpense = async (req, res) => {
  try {
    const data = await summaryService.getTotalExpense();
    res.status(200).json({ totalExpense: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const netBalance = async (req, res) => {
  try {
    const data = await summaryService.getNetBalance();
    res.status(200).json({ netBalance: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categoryWise = async (req, res) => {
  try {
    const data = await summaryService.getCategoryWiseTotals();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const recentActivity = async (req, res) => {
  try {
    const data = await summaryService.getRecentActivity();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const monthlyTrends = async (req, res) => {
  try {
    const data = await summaryService.getMonthlyTrends();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  totalIncome,
  totalExpense,
  netBalance,
  categoryWise,
  recentActivity,
  monthlyTrends,
};