import React, { useEffect } from "react";
import "./MyBookings.css"; // Assuming you have a CSS file for styling
import { QRCode } from 'react-qr-code'; 

const MyBookings = () => {
  const [bookings, setData] = React.useState([]);
  useEffect( () => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(`https://sharath-travelhub.onrender.com/api/bookings/my?email=${email}`, );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      <p>List of your past and upcoming trips will be shown here.</p>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <h3>Booking ID: {booking._id}</h3>
            <p><strong>Name:</strong> {booking.passengerDetails.name}</p>
            <p><strong>Email:</strong> {booking.passengerDetails.email}</p>
            <p><strong>Phone:</strong> {booking.passengerDetails.phone}</p>
            <p><strong>Ticket ID</strong>{booking.ticketId}</p>
            <p><strong>Seats Numbers:</strong> {booking.seats.join(", ")}</p>
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
            <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
            <p><strong>Booking Status:</strong> {booking.bookingStatus}</p>
            <p><strong>Booking Time:</strong> {new Date(booking.bookingTime).toLocaleString()}</p>
            <p><strong>Payment ID:</strong> {booking.paymentId}</p>
            <p><strong> <QRCode 
                              value={`TicketID:${booking.paymentId},Seat:${booking.seats}`} 
                                    size={128} 
                                    bgColor="#fff" 
                                    fgColor="#000"
                                  /></strong></p>
          </div>
        ))
      )}

    </div>
  );
};

export default MyBookings;