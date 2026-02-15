const express = require("express");
const router = express.Router();

const { getPackages, enrollElder } = require("../controllers/elderController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getPackages);

router.post(
  "/enroll",
  protect,
  authorize("patient"),
  enrollElder
);

module.exports = router;
