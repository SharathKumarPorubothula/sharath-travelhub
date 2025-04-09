// server/models/Bus.js

import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
});

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String }, // e.g., Sleeper, AC, Semi-Sleeper
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true }, // e.g., "2025-04-10"
  departureTime: { type: String },
  arrivalTime: { type: String },
  duration: { type: String },
  price: { type: Number, required: true },
  seats: [seatSchema],
  operatorName: { type: String },
  rating: { type: Number, default: 4.0 },
});

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
