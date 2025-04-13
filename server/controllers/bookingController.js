// server/controllers/bookingController.js

import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { busId, seats, totalPrice } = req.body;

    if (!busId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      bus: busId,
      seats,
      totalPrice,
      paymentStatus: "paid", // you can update this based on payment gateway
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/my
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Get Bookings Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Cancel Booking Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
