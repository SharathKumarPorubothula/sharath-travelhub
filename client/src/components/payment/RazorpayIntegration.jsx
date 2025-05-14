// src/components/payment/RazorpayIntegration.jsx
import React from "react";

const RazorpayIntegration = ({ amount, bookingId }) => {
  const handlePayment = async () => {
    // Call to create order
    const createResponse = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, bookingId }),
    });

    const data = await createResponse.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Sharath Travels",
      description: "Bus Ticket Booking",
      order_id: data.id,
      handler: async (response) => {
        // verify payment
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        alert("✅ Payment Successful!");
      },
      prefill: {
        name: "Sharath User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="pay-btn">
      Pay ₹{amount} Now
    </button>
  );
};

export default RazorpayIntegration;
