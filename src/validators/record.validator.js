const validateCreateRecord = (req, res, next) => {
  const { amount, type, category } = req.body;

  if (amount === undefined || type === undefined || category === undefined) {
    return res.status(400).json({
      message: "Amount, type and category are required",
    });
  }

  if (typeof amount !== "number" || amount < 0) {
    return res.status(400).json({
      message: "Amount must be a positive number",
    });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({
      message: "Type must be 'income' or 'expense'",
    });
  }

  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({
      message: "Category must be a valid string",
    });
  }

  next();
};

const validateUpdateRecord = (req, res, next) => {
  const allowedFields = ["amount", "type", "category", "date", "note"];

  const keys = Object.keys(req.body);

  const isValid = keys.every((key) => allowedFields.includes(key));

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid fields in update",
    });
  }

  next();
};

module.exports = {
  validateCreateRecord,
  validateUpdateRecord,
};