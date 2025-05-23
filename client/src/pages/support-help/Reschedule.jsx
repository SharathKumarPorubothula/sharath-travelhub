import React, { useState } from 'react';
import './SupportHelp.css';
import { useNavigate } from 'react-router-dom';

const Reschedule = () => {
  const [ticketId, setTicketId] = useState('');
  const [newDate, setNewDate] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleReschedule = async () => {
   if (!token) {
      alert('Please log in to reschedule a ticket.');
      navigate('/login');
      return;
    }else{
      try {
        const response = await fetch(`https://sharath-travelhub.onrender.com/api/bookings/reschedule`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticketId,
            newDate,
          }),
        });
    
        if (response.ok) {
          alert(`Booking rescheduled successfully on ${newDate}`);
        } else {
          alert('Failed to reschedule booking. Please enter valid TicketId');
        }
      } catch (error) {
        alert('Failed to reschedule booking');
        console.error(error);
      }
    }
  };
  

  return (
    <div className="support-page">
      <h2>Reschedule Ticket</h2>
      <input
        type="text"
        placeholder="Enter Ticket ID"
        // value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <input
        type="date"
        // value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button onClick={handleReschedule}>Reschedule</button>
    </div>
  );
};

export default Reschedule;
