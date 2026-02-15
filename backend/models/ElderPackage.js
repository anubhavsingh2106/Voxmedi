const mongoose = require("mongoose");

const elderPackageSchema = new mongoose.Schema({
  name: String,
  monthlyPrice: Number,
  services: [String],
  homeVisitFrequency: String,
  emergencySupport: Boolean,
});

module.exports = mongoose.model("ElderPackage", elderPackageSchema);
