const mongoose = require("mongoose");

const testBookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    labStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    address: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: String,

    status: {
      type: String,
      enum: ["booked", "sample_collected", "report_ready", "cancelled"],
      default: "booked",
    },

    reportUrl: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("TestBooking", testBookingSchema);
