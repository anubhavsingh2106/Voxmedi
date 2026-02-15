const User = require("../models/User");
const Rating = require("../models/Rating");

// GET /api/doctors?type=Ayurveda
exports.getDoctors = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = {
      role: "doctor",
      isProfileComplete: true,
      isVerified: true,
    };

    if (type) {
      filter.treatmentType = type;
    }

    const doctors = await User.find(filter).select("-password");

    // Add average rating
    const doctorsWithRating = await Promise.all(
      doctors.map(async (doctor) => {
        const ratings = await Rating.find({ doctor: doctor._id });

        let avgRating = 0;

        if (ratings.length > 0) {
          const total = ratings.reduce((sum, r) => sum + r.rating, 0);
          avgRating = Number((total / ratings.length).toFixed(1));
        }

        return {
          _id: doctor._id,
          name: doctor.name,
          specialization: doctor.specialization,
          qualification: doctor.qualification,
          experience: doctor.experience,
          profileImage: doctor.profileImage,
          treatmentType: doctor.treatmentType,
          consultationFee: doctor.consultationFee,
          averageRating: avgRating,
        };
      })
    );

    res.json(doctorsWithRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Doctor updates profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await User.findById(req.user._id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      specialization,
      qualification,
      experience,
      profileImage,
      bio,
      treatmentType,
      availableDays,
      availableTimeSlots,
      consultationFee,
    } = req.body;

    doctor.specialization = specialization || doctor.specialization;
    doctor.qualification = qualification || doctor.qualification;
    doctor.experience = experience || doctor.experience;
    doctor.profileImage = profileImage || doctor.profileImage;
    doctor.bio = bio || doctor.bio;
    doctor.treatmentType = treatmentType || doctor.treatmentType;
    doctor.availableDays = availableDays || doctor.availableDays;
    doctor.availableTimeSlots = availableTimeSlots || doctor.availableTimeSlots;
    doctor.consultationFee = consultationFee || doctor.consultationFee;

    doctor.isProfileComplete = true;

    await doctor.save();

    res.json({
      message: "Profile updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
