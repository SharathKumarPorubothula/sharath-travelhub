import React, { useState } from 'react';
import './SupportHelp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CancelTicket = () => {
  const [ticketId, setTicketId] = useState('');
  const navigate = useNavigate();
  const handleCancel = async () => {
    const token = localStorage.getItem('authToken');
    if(!token) {
      alert('Please log in to cancel a ticket.');
navigate('/login');
      return;
    }else{
      try {
        // console.log('Cancelling ticket with paymentId:', paymentId); // Debugging line
        const response = await axios.post(`https://sharath-travelhub.onrender.com/api/bookings/cancel`, { ticketId });
        // console.log('Response from server:', response.data); // Debugging line
        if(response){
          alert(`Booking cancelled successfully. The ticketId is ${ticketId} `);
        }else{
          alert(`Failed to cancel booking Please enter valid Ticket ID `);
        }
      } catch (error) {
        alert('Failed to cancel booking');
        console.error(error);
      }
    }
  };

  return (
    <div className="support-page">
      <h2>Cancel Ticket</h2>
      <input
        type="text"
        placeholder="Enter Ticket ID"
        // value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={handleCancel}>Cancel Ticket</button>
    </div>
  );
};

export default CancelTicket;
