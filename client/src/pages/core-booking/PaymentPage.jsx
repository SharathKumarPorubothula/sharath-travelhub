import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ added useNavigate
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ init navigate
  const { bus, date, selectedSeats, passenger } = location.state || {};

  const handlePayment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bus.price * selectedSeats.length * 100, // amount in paise
        }),
      });

      const data = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'Sharath Travels',
        description: 'Bus Ticket Payment',
        order_id: data.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          navigate('/show-ticket', {
            state: {
              bus,
              date,
              selectedSeats,
              passenger,
              paymentId: response.razorpay_payment_id,
            },
          });
        },
        prefill: {
          name: passenger.name,
          email: passenger.email,
          contact: passenger.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment');
    }
  };


  const generatePaymentId = () => {
    const prefix = "PAY";
    const randomNum = Math.floor(100000000 + Math.random() * 900000000); // 9-digit number
    return `${prefix}${randomNum}`;
  };
  
  // ✅ Fake Payment handler
  const handleFakePayment = () => {
    alert('💸 Fake Payment Successful');
    navigate('/show-ticket', {
      state: {
        bus,
        date,
        selectedSeats,
        passenger,
        paymentId: generatePaymentId()
      },
    });
  };

  const totalAmount = bus ? bus.price * selectedSeats.length : 0;

  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>

      <div className="summary">
        <h3>Booking Summary</h3>
        <p><strong>Name:</strong> {passenger?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {passenger?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {passenger?.phone || 'N/A'}</p>
        <p><strong>Bus:</strong> {bus?.name || 'N/A'} ({bus?.type || 'N/A'})</p>
        <p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Seats Numbers:</strong> {selectedSeats?.join(', ') || 'N/A'}</p>
        <p>
          <strong>Total Amount:</strong> 
          <span className="amount-highlight">₹{totalAmount.toLocaleString('en-IN')}</span>
        </p>
      </div>

      <button className="payment-btn" onClick={handlePayment}>
        Pay ₹{totalAmount.toLocaleString('en-IN')}
      </button>

      {/* ✅ Fake Payment Button */}
      <button className="payment-btn fake-payment" onClick={handleFakePayment}>
        💳 Fake Payment
      </button>
    </div>
  );
};

export default PaymentPage;
