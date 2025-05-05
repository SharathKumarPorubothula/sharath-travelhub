// server/controllers/bookingController.js

import e from "express";
import Booking from "../models/Booking.js";
// import Bus from "../models/Bus.js";


export const createBooking = async (req, res) => {
  try {
    const {  seats, passengerDetails, paymentId, totalAmount, bookingTime,user,ticketId,Departure,Destination } = req.body;

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
      ticketId,
      seats,
      passengerDetails,
      paymentId,
      Departure,
      Destination,
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
    const email= req.query.email
    const bookings = await Booking.find({ user: email});
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
    const booking = await Booking.findOne({ ticketId: ticketId });

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
  const { ticketId } = req.body;
  console.log('Received paymentId:', ticketId);

  try {
    const booking = await Booking.findOne({ ticketId: ticketId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.deleteOne();  // Delete the found booking
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error in cancelling booking:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const rescheduleBooking = async (req, res) => {
  const { ticketId, newDate } = req.body;
  try {
    const booking = await Booking.findOne({ ticketId }); // 🔥 findOne, not findById
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.bookingTime = newDate;
    await booking.save();
    res.status(200).json({ message: 'Booking rescheduled successfully' });
  } catch (error) {
    console.error('Error in rescheduling booking:', error); // helpful to log
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const { email } = req.query; // Assuming you're sending the email in the query params
    const bookings = await Booking.find({ user: email });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};






