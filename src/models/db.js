const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  long: { type: Number, required: true },
  lat: { type: Number, required: true },
});

const School = mongoose.model("School", SchoolSchema);
module.exports = School;
