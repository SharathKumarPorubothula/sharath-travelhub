import React, { useState } from 'react';
import './SupportHelp.css';

const Reschedule = () => {
  const [ticketId, setTicketId] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleReschedule = () => {
    alert(`Ticket ${ticketId} rescheduling requested for ${newDate}`);
  };

  return (
    <div className="support-page">
      <h2>Reschedule Ticket</h2>
      <input
        type="text"
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button onClick={handleReschedule}>Reschedule</button>
    </div>
  );
};

export default Reschedule;
