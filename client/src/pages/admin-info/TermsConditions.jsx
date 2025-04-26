import React from 'react';
import './AdminInfo.css';

const TermsConditions = () => {
  return (
    <div className="admin-info-page">
      <h2>Terms and Conditions</h2>
      <p>By using SharathTravels, you agree to the following terms and conditions...</p>
      <ul>
        <li>Users must provide accurate booking information.</li>
        <li>Tickets once booked are subject to cancellation rules.</li>
        <li>SharathTravels is not liable for delays caused by bus operators.</li>
      </ul>
    </div>
  );
};

export default TermsConditions;
