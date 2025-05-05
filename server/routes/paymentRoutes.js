import express from 'express';
import { createOrder, verifyPayment,SavedPayments } from '../controllers/paymentController.js';


const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/saved-payments',SavedPayments)

export default router;
