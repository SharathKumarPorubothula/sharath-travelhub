import React from 'react';
import './AdminInfo.css';

const OperatorSignup = () => {
  return (
    <div className="admin-info-page">
      <h2>Operator Signup</h2>
      <p>If you're a bus operator and want to list your services on SharathTravels, please fill out the form below.</p>
      <form>
        <input type="text" placeholder="Operator Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Phone Number" required />
        <input type="text" placeholder="Company Name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OperatorSignup;
