import React from 'react';
import './terms.css';

function Terms() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      
      <p>Welcome to our Bus Ticket Booking service. Please read these terms carefully.</p>

      <div className="terms-section">
        <h3>1. Booking Policy</h3>
        <p>
          All bookings are subject to seat availability and confirmation. 
          Tickets once booked cannot be transferred to another person.
        </p>
      </div>

      <h3>2. Cancellation and Refund</h3>
      <p>
        Cancellations are allowed up to 24 hours before the scheduled departure. 
        Refunds will be processed within 5-7 business days after cancellation.
      </p>

      <h3>3. Travel Rules</h3>
      <p>
        Passengers must carry a valid government ID during travel. 
        No refund will be provided for missing the bus due to late arrival.
      </p>

      <h3>4. Liability</h3>
      <p>
        We are not responsible for any loss, injury, or damage during the journey. 
        Passengers are requested to take care of their belongings.
      </p>

      <h3>5. Changes to Terms</h3>
      <p>
        We reserve the right to modify these terms at any time. 
        Continued usage of our service implies acceptance of any changes.
      </p>

      <p className="terms-footer">
        Thank you for choosing our service. Have a safe journey!
      </p>
    </div>
  );
}

export default Terms;
