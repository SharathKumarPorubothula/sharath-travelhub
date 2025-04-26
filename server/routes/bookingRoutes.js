// server/routes/bookingRoutes.js

import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingById
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new booking//protect, 
router.post("/", createBooking);

// Get all bookings for logged-in user
router.get("/my", protect, getUserBookings);

router.get("/", getBookingById);

// Cancel a specific booking
router.put("/:id/cancel", protect, cancelBooking);

export default router;
