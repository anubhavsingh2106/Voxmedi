const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Blood Test
  description: String,
  price: Number,
  category: String, // Pathology / Radiology
  homeAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Test", testSchema);
