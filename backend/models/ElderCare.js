const mongoose = require("mongoose");

const elderCareSchema = new mongoose.Schema({
  title: String,
  description: String,
  services: [String],
});

module.exports = mongoose.model("ElderCare", elderCareSchema);
