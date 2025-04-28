import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShowTicket.css';
import { useEffect } from 'react';
import { QRCode } from 'react-qr-code'; 

const ShowTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, date, selectedSeats, passenger, paymentId,ticketId } = location.state || {};
  const [ticket, setTicketId] = useState('');
  const [error, setError] = useState('');
  const [hasBooked, setHasBooked] = useState(false);
  const token=localStorage.getItem("token");

  const handleRetrieveTicket = async (e) => {
    e.preventDefault();
   if(!token){
    alert("Please login to retrieve your ticket.");
    navigate('/login');
   }else{
    if (!ticket.trim()) {
      setError('Please enter a valid ticket ID');
      return;
    }
    // Here you would typically make an API call to retrieve the ticket
    // For now, we'll just simulate it with a timeout
    const ticketData = await fetch(`http://localhost:5000/api/bookings?ticketId=${ticket}`);
      const response = await ticketData.json();
      console.log(response);

      if( response.message== "paymentId (ticketId) is required"){
        alert('Please enter a valid ticket ID');
        return;
      }

    if (response.message === 'Booking not found') {
      alert('Ticket not found. Please check your ID and try again.');
      return;
    }
    if(response.message==='Server Error'){
      alert('Server Error. Please try again later.');
      return;
    }
    if(response){
      alert('Ticket retrieved successfully!');
      setTimeout(() => {
        navigate('/ticket', { state: {response} });
      }, 1000);
      return;
    }

   }
    // setError('Retrieving ticket...'); 
    // setTimeout(() => {
    //   setError('Ticket not found. Please check your ID and try again.');
    // }, 1500);
  };


  

  useEffect(() => {
    const sendBookingToBackend = async () => {
      try {
 
        const user=localStorage.getItem("email");
        const response = await fetch('http://localhost:5000/api/bookings/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // userId: "user_id", // Replace this with actual user id
            // busId: bus._id, // Make sure bus has _id
            user: user,
            ticketId,
            seats: selectedSeats,
            passengerDetails: passenger,
            paymentId,
            totalAmount: bus.price * selectedSeats.length,
            Departure: bus.source,
            Destination: bus.destination,
            bookingTime: date || new Date(),
          }),
        });
  
        if (!response.ok) {
          throw new Error("Booking failed");
        }
        if(response.message== "Booking already exists"){
          setError("Booking already exists. Please check your ticket ID.");
          return;
        }
  
        // const data = await response.json();
        // console.log("✅ Booking successful:", data);
      } catch (error) {
        console.error("❌ Error while booking:", error.message);
      }
    };
  
    if (!hasBooked && bus && passenger && selectedSeats && paymentId) {
      sendBookingToBackend();
      setHasBooked(true); // ensures booking happens only once
    }
  }, [bus, passenger, selectedSeats, paymentId,ticketId]);
  
  

  if (!bus || !passenger || !selectedSeats || !paymentId) {
    return (
      <div className="ticket-page">
        <h2>Retrieve Your Ticket</h2>
        <div className="retrieve-ticket-box">
          <p>Enter your Payment ID to view your booking details</p>
          
          <form onSubmit={handleRetrieveTicket} className="ticket-retrieval-form">
            <div className="form-group">
              <label htmlFor="ticketId">Ticket ID:</label>
              <input
                type="text"
                id="ticketId"
                value={ticket}
                onChange={(e) => {
                  setTicketId(e.target.value);
                  setError('');
                }}
                placeholder="Enter your ticket ID"
              />
            </div>
            
            {error && <div className={`error-message ${error.includes('Retrieving') ? 'info' : ''}`}>{error}</div>}
            
            <button type="submit" className="retrieve-btn">
              Retrieve Ticket
            </button>
          </form>
          
          <div className="alternative-options">
            {/* <p>Can't find your ticket?</p> */}
            {/* <button 
              className="home-btn outline" 
              onClick={() => navigate('/contact')}
            >
              Contact Support
            </button> */}
            <button 
              className="home-btn outline" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="ticket-page">
      <h2 className="ticket-title">🎟️ Ticket Confirmation</h2>
      <div className="ticket-container">
        <div className="ticket-box">
          <div className="ticket-header">
            <h3>Bus Ticket</h3>
            <span className="ticket-status">Confirmed</span>
          </div>
          
          <div className="ticket-info">
            <div className="passenger-info">
              <h4>Passenger Details</h4>
              <p><strong>Name:</strong> {passenger.name}</p>
              <p><strong>Email:</strong> {passenger.email}</p>
              <p><strong>Phone:</strong> {passenger.phone}</p>
            </div>
            
            <div className="journey-info">
              <h4>Journey Details</h4>
              <p><strong>Ticket ID</strong>{ticketId}</p>
              <p><strong>Bus:</strong> {bus.name} ({bus.type})</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Seats Number:</strong> {selectedSeats.join(', ')}</p>
              <p><strong>Departure:</strong>{bus.source}</p>
              <p><strong>Destination:</strong>{bus.destination}</p>
              <p><strong>Payment ID:</strong> {paymentId}</p>
              <p className="total-amount"><strong>Total Paid:</strong> ₹{(bus.price * selectedSeats.length).toLocaleString('en-IN')}</p>
            </div>
          </div>
          
          <div className="ticket-footer">
            <div className="qr-code">
              <QRCode 
                        value={`TicketID:${paymentId},Seat:${selectedSeats[0]}`} 
                        size={128} 
                        bgColor="#fff" 
                        fgColor="#000"
                      />
            </div>
            <div className="terms">
              <p>Please show this ticket and QR code to board the bus</p>
              <p>Ticket is non-transferable | Valid ID required</p>
            </div>
          </div>
        </div>
      </div>
      <button className="home-btn" onClick={() => navigate('/')}>🏠 Back to Home</button>
    </div>
  );
};

export default ShowTicket;