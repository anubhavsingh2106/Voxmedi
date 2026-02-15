const express = require("express");
const router = express.Router();

const {
  addRating,
  getDoctorRating,
} = require("../controllers/ratingController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Patient adds rating
router.post(
  "/add",
  protect,
  authorize("patient"),
  addRating
);

// Get doctor rating
router.get(
  "/doctor/:doctorId",
  getDoctorRating
);

module.exports = router;
