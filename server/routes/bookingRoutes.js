
import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingById,
  rescheduleBooking,
  getMyBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post('/cancel', cancelBooking);
// Create a new booking//protect, 
router.post("/", createBooking);

router.get("/my",  getUserBookings);
router.get("/", getBookingById);
router.post('/reschedule', rescheduleBooking);
router.get('/my-bookings', getMyBookings);


export default router;
