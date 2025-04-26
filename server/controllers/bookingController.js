// server/controllers/bookingController.js

import Booking from "../models/Booking.js";
// import Bus from "../models/Bus.js";


export const createBooking = async (req, res) => {
  try {
    const {  seats, passengerDetails, paymentId, totalAmount, bookingTime,user } = req.body;

    if ( !seats?.length || !passengerDetails || !paymentId || !totalAmount) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    const existingBooking = await Booking.findOne({ paymentId });


    if (existingBooking) {
      return res.status(200).json({
        message: "Booking already exists",
        booking: existingBooking,
      });
    }

    // const userid=localStorage.getItem("email");
    // console.log("userid",userid);
    const totalPrice=totalAmount

    const booking = await Booking.create({
      user,
      seats,
      passengerDetails,
      paymentId,
      totalPrice,
      bookingTime,
      paymentStatus: "paid",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Get Bookings Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getBookingById = async (req, res) => {
  const { ticketId } = req.query; // ticketId = paymentId

  if (!ticketId) {
    return res.status(400).json({ message: "paymentId (ticketId) is required" });
  }

  try {
    const booking = await Booking.findOne({ paymentId: ticketId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error getting booking by paymentId:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


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
