const ElderPackage = require("../models/ElderPackage");
const ElderEnrollment = require("../models/ElderEnrollment");

// Public: View packages
exports.getPackages = async (req, res) => {
  const packages = await ElderPackage.find();
  res.json(packages);
};

// Patient enrolls
exports.enrollElder = async (req, res) => {
  try {
    const { packageId, emergencyContact, address } = req.body;

    const enrollment = await ElderEnrollment.create({
      patient: req.user._id,
      package: packageId,
      emergencyContact,
      address,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
