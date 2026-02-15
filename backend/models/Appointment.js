const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📅 Date & Time
    date: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String, // e.g., "10:00 AM - 10:30 AM"
    },

    // 🏥 Type of consultation
    mode: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    // 🩺 Reason for visit
    reason: {
      type: String,
    },

    // 📌 Status tracking
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },

    // 💰 Optional: store fee snapshot
    consultationFee: {
      type: Number,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
