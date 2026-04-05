const { getInsights } = require("../services/insights.service");

const insights = async (req, res) => {
  try {
    const data = await getInsights();

    res.status(200).json({
      success: true,
      message: "Insights fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { insights };