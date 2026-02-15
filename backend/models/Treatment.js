const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  name: String, // Ayurveda / Allopathy / Homeopathy
  description: String,
  benefits: [String],
});

module.exports = mongoose.model("Treatment", treatmentSchema);
