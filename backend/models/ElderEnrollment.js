const mongoose = require("mongoose");

const elderEnrollmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ElderPackage",
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },
    emergencyContact: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ElderEnrollment", elderEnrollmentSchema);
