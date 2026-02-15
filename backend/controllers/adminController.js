const User = require("../models/User");
const Appointment = require("../models/Appointment");
const TestBooking = require("../models/TestBooking");
const ElderEnrollment = require("../models/ElderEnrollment");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: "completed" });
    const totalTests = await TestBooking.countDocuments();
    const pendingDoctorVerification = await User.countDocuments({
      role: "doctor",
      isVerified: false,
    });

    const elderMembers = await ElderEnrollment.countDocuments({ status: "active" });

    // Calculate revenue
    const appointmentRevenue = await Appointment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$consultationFee" } } },
    ]);

    const testRevenue = await TestBooking.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    res.json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      completedAppointments,
      totalTests,
      pendingDoctorVerification,
      elderMembers,
      revenue:
        (appointmentRevenue[0]?.total || 0) +
        (testRevenue[0]?.total || 0),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
