const Rating = require("../models/Rating");
const Appointment = require("../models/Appointment");

// Patient adds rating
exports.addRating = async (req, res) => {
  try {
    const { appointmentId, rating, review } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "completed") {
      return res.status(400).json({ message: "Cannot rate before completion" });
    }

    const existingRating = await Rating.findOne({
      appointment: appointmentId,
    });

    if (existingRating) {
      return res.status(400).json({ message: "Already rated" });
    }

    const newRating = await Rating.create({
      doctor: appointment.doctor,
      patient: req.user._id,
      appointment: appointmentId,
      rating,
      review,
    });

    res.status(201).json({
      message: "Rating added successfully",
      newRating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get doctor average rating
exports.getDoctorRating = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const ratings = await Rating.find({ doctor: doctorId });

    if (ratings.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const average = total / ratings.length;

    res.json({
      averageRating: average.toFixed(1),
      totalReviews: ratings.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
