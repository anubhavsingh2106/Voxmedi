const express = require("express");
const router = express.Router();

// ✅ Import controller properly
const { register, login } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);



router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
