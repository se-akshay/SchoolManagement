require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const schoolRoutes = require("./src/routes/schoolRoutes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("helloooo.");
});
app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
