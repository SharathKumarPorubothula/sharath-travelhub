import React, { useEffect, useState } from "react";
import "./SavedPayments.css"; // Your CSS

const SavedPayments = () => {
  const [payments, setPayments] = useState([]);

const email=localStorage.getItem("email")

  useEffect(() => {
    fetch(`http://localhost:5000/api/payment/saved-payments?email=${email}`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching saved payments:", error));
  }, []);

  function generateFakeUPI() {
    const upiProviders = ["upi", "ybl", "ibl", "paytm", "phonepe", "airtel", "gpay"];
    
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit random number
    const randomProvider = upiProviders[Math.floor(Math.random() * upiProviders.length)];
  
    const numberString = randomNumber.toString();
  
    // Hide the first 5 digits
    const hiddenNumber = numberString
      .split('')
      .map((digit, index) => (index < 5 ? '*' : digit))
      .join('');
  
    return `${hiddenNumber}@${randomProvider}`;
  }
  

  function generateRandomFutureDate() {
    const today = new Date();
    const minDaysAhead = 20;
    const maxDaysAhead = 60; // up to 60 days randomly
  
    // Random number between 20 and 60
    const randomDays = Math.floor(Math.random() * (maxDaysAhead - minDaysAhead + 1)) + minDaysAhead;
  
    // Add random days to today's date
    today.setDate(today.getDate() + randomDays);
  
    return today.toISOString().split('T')[0]; // Return as 'YYYY-MM-DD'
  }

  function generateFakeCardNumber() {
    const prefixes = ["4", "5"]; // 4 for Visa, 5 for MasterCard
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
    let cardNumber = prefix;
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10); // Random digits
    }
  
    // Now hide the first 8 digits
    let hiddenCardNumber = cardNumber
      .split('')
      .map((digit, index) => {
        if (index < 8) {
          return '*';
        }
        return digit;
      })
      .join('');
  
    return hiddenCardNumber.replace(/(.{4})/g, '$1 ').trim(); // Format like 4-4-4-4
  }
  

  return (
    <div className="saved-payments">
      <h2>Saved Payment Methods</h2>

     
      {payments.map((payment) => (
    <div key={payment.paymentId} className="payment-card">
      <div className="payment-type">
        <strong>Type:</strong>
        <span className="payment-badge">FAKE PAYMENT</span>
      </div>
      
      <div className="payment-details">
        <p>
          <strong>Card Number:</strong>
          <span className="card-number">{generateFakeCardNumber()}</span>
        </p>
        <p>
          <strong>Card Holder:</strong>
          <span>{payment.passengerDetails.name}</span>
        </p>
        <p>
          <strong>Expiry:</strong>
          <span>{generateRandomFutureDate()}</span>
        </p>
        <p>
          <strong>UPI ID:</strong>
          <span>{generateFakeUPI()}</span>
        </p>
      </div>
      
     
    </div>
  ))}
    </div>
  );
};

export default SavedPayments;
