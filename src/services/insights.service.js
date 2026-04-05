const Record = require("../models/record.model");

const calculateAverage = (arr) => {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

const calculateStdDev = (arr, mean) => {
  if (!arr.length) return 0;
  const variance =
    arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    arr.length;
  return Math.sqrt(variance);
};

const getInsights = async () => {
  const records = await Record.find({isDeleted: false });

  if (!records.length) {
    return {
      message: "No data available",
    };
  }

  const income = [];
  const expense = [];
  const categoryMap = {};

  records.forEach((r) => {
    if (r.type === "income") income.push(r.amount);
    if (r.type === "expense") expense.push(r.amount);

    if (!categoryMap[r.category]) {
      categoryMap[r.category] = 0;
    }
    categoryMap[r.category] += r.amount;
  });

  const avgIncome = calculateAverage(income);
  const avgExpense = calculateAverage(expense);

  const stdExpense = calculateStdDev(expense, avgExpense);

  const totalIncome = income.reduce((a, b) => a + b, 0);
  const totalExpense = expense.reduce((a, b) => a + b, 0);

  const ratio = totalIncome ? totalExpense / totalIncome : 0;

  let topCategory = null;
  let max = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topCategory = key;
    }
  }

  return {
    averageIncome: avgIncome,
    averageExpense: avgExpense,
    expenseStdDeviation: stdExpense,
    expenseToIncomeRatio: ratio,
    topCategory,
    totalTransactions: records.length,
  };
};

module.exports = { getInsights };