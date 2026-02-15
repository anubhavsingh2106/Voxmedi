const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { 
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus,
  getStats
} = require("../controllers/appointmentController");



router.get("/stats", protect, authorize("admin"), getStats);

router.put(
  "/:id/complete",
  protect,
  authorize("doctor"),
  updateAppointmentStatus
);

// Patient books
router.post("/book", protect, authorize("patient"), bookAppointment);

// Doctor views
router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

// Patient views
router.get("/patient", protect, authorize("patient"), getPatientAppointments);

module.exports = router;
