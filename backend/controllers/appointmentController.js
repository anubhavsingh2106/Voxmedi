const Appointment = require("../models/Appointment");

// Patient books appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, mode, reason } = req.body;

    // 🔥 CHECK IF SLOT ALREADY BOOKED
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      status: "booked",
    });

    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // ✅ CREATE APPOINTMENT
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      timeSlot,
      mode,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Doctor views their appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user._id,
    }).populate("patient", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Patient views their appointments
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    await appointment.save();

    res.json({ message: "Appointment marked as completed", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({
      status: "completed",
    });

    res.json({
      totalAppointments,
      completedAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
