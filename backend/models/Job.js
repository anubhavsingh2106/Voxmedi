const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  department: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Job", jobSchema);
