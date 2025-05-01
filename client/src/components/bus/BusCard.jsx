import React from "react";
import { useNavigate } from "react-router-dom";
import "./BusCard.css";

const BusCard = ({ bus }) => {
  const navigate = useNavigate();
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const handleSelectSeats = () => {
    const userData = localStorage.getItem("authToken");
    if(userData){
      navigate('/select-seat', {
        state: {
          bus,
          date, // include travel date if needed
        },
      });
    }else{
      alert("Please login to select seats!");
      navigate('/login');
    }
  };

  return (
    <div className="bus-card">
      <div className="bus-card-header">
        <h3 className="bus-operator">{bus.operator}</h3>
        <span className="bus-type">{bus.type || "AC Sleeper"}</span>
      </div>
      
      <div className="bus-card-content">
        <div className="route-info">
          <p className="route">
            <span className="city">{bus.source}</span>
            <span className="arrow">→</span>
            <span className="city">{bus.destination}</span>
          </p>
        </div>
        
        <div className="timing-info">
          <div className="time-block">
            <span className="time-label">Departure</span>
            <span className="time-value">{bus.departureTime}</span>
          </div>
          <div className="time-block">
            <span className="time-label">Arrival</span>
            <span className="time-value">{bus.arrivalTime}</span>
          </div>
        </div>
        
        <div className="price-info">
          <span className="price-label">Price:</span>
          <span className="price-value">₹{bus.price}</span>
        </div>
      </div>
      
      <button className="select-seats-btn" onClick={handleSelectSeats}>
        Select Seats
      </button>
    </div>
  );
};

export default BusCard;
