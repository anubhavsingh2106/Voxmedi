const Prescription = require("../models/Prescription");

// Doctor adds prescription
exports.addPrescription = async (req, res) => {
  try {
    const { appointmentId, diagnosis, medicines, notes } = req.body;

    const prescription = await Prescription.create({
      appointment: appointmentId,
      diagnosis,
      medicines,
      notes,
    });

    res.status(201).json({
      message: "Prescription added successfully",
      prescription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Patient views prescription by appointment
exports.getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      appointment: req.params.appointmentId,
    }).populate({
      path: "appointment",
      populate: [
        { path: "patient", select: "name email" },
        { path: "doctor", select: "name email" },
      ],
    });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
