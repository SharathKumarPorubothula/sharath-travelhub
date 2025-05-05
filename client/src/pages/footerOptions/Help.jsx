import React from 'react';
import './Help.css';

function Help() {

  return (
    <div className="help-container">
    <h1 className="help-header">Help & Support</h1>

    <p className="help-intro">If you have any questions or need assistance, we're here to help you!</p>

    <div className="help-section">
      <h3>1. Booking Related Queries</h3>
      <p>
        - How to book a ticket? <br />
        - How to choose a seat? <br />
        - How to receive the ticket confirmation?
      </p>
    </div>

      <h3>2. Payment Issues</h3>
      <p>
        - Payment failed, but amount deducted? <br />
        - Refunds after cancellation? <br />
        - How to apply a promo code?
      </p>

      <h3>3. Cancellation & Refund</h3>
      <p>
        - How to cancel a booked ticket? <br />
        - Refund processing time? <br />
        - Cancellation charges applicable?
      </p>

      <h3>4. Contact Us</h3>
      <p>
        If you need further assistance, please contact our support team:
      </p>
      <ul>
        <li>Email: support@bustickets.com</li>
        <li>Phone: +91-9876543210</li>
        <li>Live Chat: Available 24/7</li>
      </ul>

      <p className="help-footer">
        Thank you for choosing our service. Wishing you a safe and happy journey!
      </p>
    </div>
  );
}

export default Help;
