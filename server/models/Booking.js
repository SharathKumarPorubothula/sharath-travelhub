// server/models/Booking.js

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  user: { type: String, required: true }, 
  ticketId:String,// userId as string for simplicity
  seats: [String],
  passengerDetails: {
    name: String,
    email: String,
    phone: String,
  },
  paymentId: {
    type: String,
    required: true,
    unique: true, 
  },
  totalPrice: Number,
  Departure: String,
  Destination:String,
  paymentStatus: { type: String, default: "unpaid" },
  bookingTime: Date,
  bookingStatus: { type: String, default: "confirmed" },
});


const Booking = mongoose.model("bookings", bookingSchema);

export default Booking;
