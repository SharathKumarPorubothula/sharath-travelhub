import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Assuming you have a CSS file for styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserBookings();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(`http://localhost:5000/api/auth/profile?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await fetch(`http://localhost:5000/api/bookings/my-bookings?email=${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>

      <div className="user-info">
        <h3>Your Info</h3>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="booking-overview">
        <h3>My Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.paymentId}>
                {booking.Departure} → {booking.Destination} on {new Date(booking.bookingTime).toLocaleDateString()} 
                - <strong>Seat Number:</strong> {booking.seats.map(e=>e+",")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
