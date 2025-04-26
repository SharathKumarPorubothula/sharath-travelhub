import React, { useState } from 'react';
import './SupportHelp.css';

const CancelTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const handleCancel = () => {
    alert(`Ticket ${ticketId} cancellation requested.`);
  };

  return (
    <div className="support-page">
      <h2>Cancel Ticket</h2>
      <input
        type="text"
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={handleCancel}>Cancel Ticket</button>
    </div>
  );
};

export default CancelTicket;
