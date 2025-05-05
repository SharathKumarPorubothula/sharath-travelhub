// server/routes/bookingRoutes.js

import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingById,
  rescheduleBooking,
  getMyBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/cancel', cancelBooking);
// Create a new booking//protect, 
router.post("/", createBooking);

// Get all bookings for logged-in user
// protect,
router.get("/my",  getUserBookings);
router.get("/", getBookingById);
router.post('/reschedule', rescheduleBooking);
router.get('/my-bookings', getMyBookings);


export default router;
