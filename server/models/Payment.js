import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;