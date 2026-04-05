const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    res.status(200).json({
      message: "User role updated",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "User status updated",
      data: updatedUser,
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUserRole,
  updateUserStatus,
};