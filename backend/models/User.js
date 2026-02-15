const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin" , "lab_staff"],
      default: "patient",
    },

    language: {
      type: String,
      default: "en",
    },

    // 🧑‍⚕️ Doctor Fields
    specialization: String,
    qualification: String,
    experience: Number,
    profileImage: String,
    bio: String,

    // 👇 NEW — Treatment Type
    treatmentType: {
      type: String,
      enum: ["Allopathy", "Ayurveda", "Homeopathy"],
    },

    // 👇 Availability
    availableDays: [String],
    availableTimeSlots: [String],
    consultationFee: Number,

    // 👇 Patient Medical Info
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: String,
    height: Number,
    weight: Number,
    allergies: String,
    chronicDiseases: String,

    // 👇 Account Status
    isVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
