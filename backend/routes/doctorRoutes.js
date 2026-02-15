const express = require("express");
const router = express.Router();

const {
  getDoctors,
  updateDoctorProfile,
} = require("../controllers/doctorController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public list
router.get("/", getDoctors);

// Doctor updates own profile
router.put(
  "/profile",
  protect,
  authorize("doctor"),
  updateDoctorProfile
);

module.exports = router;
