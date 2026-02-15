const Test = require("../models/Test");
const TestBooking = require("../models/TestBooking");


// Lab staff updates test status
exports.updateTestStatus = async (req, res) => {
  try {
    const { status, reportUrl } = req.body;

    const booking = await TestBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status || booking.status;

    if (reportUrl) {
      booking.reportUrl = reportUrl;
    }

    await booking.save();

    res.json({
      message: "Test status updated successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Public: Get all tests
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lab staff view assigned bookings
exports.getLabBookings = async (req, res) => {
  try {
    const bookings = await TestBooking.find({ labStaff: req.user._id })
      .populate("patient", "name email")
      .populate("test", "name price");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Patient books home test
exports.bookTest = async (req, res) => {
  try {
    const { testId, address, date, timeSlot } = req.body;

    const booking = await TestBooking.create({
      patient: req.user._id,
      test: testId,
      address,
      date,
      timeSlot,
    });

    res.status(201).json({
      message: "Test booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin assigns lab staff
exports.assignLabStaff = async (req, res) => {
  try {
    const { labStaffId } = req.body;

    const booking = await TestBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.labStaff = labStaffId;
    await booking.save();

    res.json({
      message: "Lab staff assigned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

