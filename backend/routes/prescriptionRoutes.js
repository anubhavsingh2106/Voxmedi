const express = require("express");
const router = express.Router();

const {
  addPrescription,
  getPrescription,
} = require("../controllers/prescriptionController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Doctor adds
router.post(
  "/add",
  protect,
  authorize("doctor"),
  addPrescription
);

// Patient views
router.get(
  "/:appointmentId",
  protect,
  getPrescription
);

module.exports = router;
