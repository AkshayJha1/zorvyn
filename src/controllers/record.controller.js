const Record = require("../models/record.model");

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;
    const userId = req.user?.id || req.body.userId; // for now fallback

    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type and category are required",
      });
    }

    const record = await Record.create({
      userId,
      amount,
      type,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Record created successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecords = async (req, res) => {
  try {
    const { page = 1, limit = 5, type, category } = req.query;

    const filter = { isDeleted: false };

    if (type) filter.type = type;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const records = await Record.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Record.countDocuments(filter);

    res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = ["amount", "type", "category", "date", "note"];

    const updates = {};

    for (let key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided",
      });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    res.status(200).json({
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await Record.findByIdAndUpdate(id, { isDeleted: true });

    res.status(200).json({
      message: "Record deleted (soft)",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const permanentDeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    await Record.findByIdAndDelete(id);

    res.status(200).json({
      message: "Record permanently deleted",
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  permanentDeleteRecord,
};