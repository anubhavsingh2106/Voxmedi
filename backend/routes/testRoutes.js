const express = require("express");
const router = express.Router();

const {
  getTests,
  bookTest,
  getLabBookings,
  updateTestStatus,
  assignLabStaff,
} = require("../controllers/testController");

const { protect, authorize } = require("../middleware/authMiddleware");


// ==============================
// 🔓 PUBLIC ROUTES
// ==============================

// Get all available tests
router.get("/", getTests);


// ==============================
// 👤 PATIENT ROUTES
// ==============================

// Patient books a home test
router.post(
  "/book",
  protect,
  authorize("patient"),
  bookTest
);


// ==============================
// 🛡 ADMIN ROUTES
// ==============================

// Admin assigns lab staff to booking
router.put(
  "/assign/:id",
  protect,
  authorize("admin"),
  assignLabStaff
);


// ==============================
// 👨‍🔬 LAB STAFF ROUTES
// ==============================

// Lab staff views assigned bookings
router.get(
  "/lab/bookings",
  protect,
  authorize("lab_staff"),
  getLabBookings
);

// Lab staff updates booking status
router.put(
  "/lab/update/:id",
  protect,
  authorize("lab_staff"),
  updateTestStatus
);


module.exports = router;
