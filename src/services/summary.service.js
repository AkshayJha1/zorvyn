const Record = require("../models/record.model");

const getTotalIncome = async () => {
  const result = await Record.aggregate([
    { $match: { type: "income", isDeleted: false } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return result[0]?.total || 0;
};

const getTotalExpense = async () => {
  const result = await Record.aggregate([
    { $match: { type: "expense", isDeleted: false } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return result[0]?.total || 0;
};

const getNetBalance = async () => {
  const income = await getTotalIncome();
  const expense = await getTotalExpense();
  return income - expense;
};

const getCategoryWiseTotals = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ]);
};

const getRecentActivity = async () => {
  return await Record.find({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .limit(5);
};

const getMonthlyTrends = async () => {
  return await Record.aggregate([
    { $match: {isDeleted: false } },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);
};

module.exports = {
  getTotalIncome,
  getTotalExpense,
  getNetBalance,
  getCategoryWiseTotals,
  getRecentActivity,
  getMonthlyTrends,
};