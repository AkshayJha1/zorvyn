const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const recordRoutes = require("./routes/record.routes");
const summaryRoutes = require("./routes/summary.routes");
const insightsRoutes = require("./routes/insights.routes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/insights", insightsRoutes);

module.exports = app;