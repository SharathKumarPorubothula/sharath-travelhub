// client/src/pages/core-booking/PassengerDetails.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PassengerDetails.css";
import { useNavigate } from "react-router-dom";

const PassengerDetails = () => {
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const location = useLocation();
  const { bus, date, selectedSeats } = location.state || {};

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent actual form submission
  
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
    }
    else {
      alert("Passenger details submitted: " + JSON.stringify(passenger));
      navigate("/payment", {
        state: {
          bus,
          date,
          selectedSeats,
          passenger,
        },
      });
    }
  };

  return (
    <div className="passenger-details">
      <h2>Enter Passenger Details</h2>
      
      {bus && (
        <div className="bus-summary">
          <p><span>Bus:</span> <span>{bus.name} ({bus.type})</span></p>
          <p><span>Date:</span> <span>{new Date(date).toLocaleDateString()}</span></p>
          <p><span>Seats Numbers:</span> <span>{selectedSeats.join(', ')}</span></p>
          <p><span>Departure:</span> <span>{bus.departureTime}</span></p>
          <p><span>ArrivalTime:</span> <span>{bus.arrivalTime}</span></p>
        </div>
      )}

      <form>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={passenger.name}
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="number" 
          name="age" 
          placeholder="Age" 
          min="1" 
          max="100"
          value={passenger.age}
          onChange={handleChange} 
          required 
        />
        
        <select 
          name="gender" 
          value={passenger.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={passenger.email}
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          value={passenger.phone}
          onChange={handleChange} 
          required 
        />
        
        <button onClick={handleSubmit} type="submit" className="submit-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default PassengerDetails;