import React, { useState } from "react";
import "./SeatSelection.css";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const { bus, date } = useLocation().state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev => 
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleProceed = () => {
    if (!selectedSeats.length) return alert("Please select seats");
    alert(`selected seats are ${selectedSeats}`)
    navigate("/passenger-details", { state: { bus, date, selectedSeats } });
  };

  return (
    <div className="seat-app">
      <h2>Select Seats <span className="bus-icon">🚌</span></h2>
      
      <div className="seat-grid">
        {seats.map(seat => (
          <div 
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => toggleSeat(seat)}
          >
            <div className="seat-shape">
              <div className="seat-back"></div>
              <div className="seat-base"></div>
            </div>
            <span className="seat-number">{seat}</span>
          </div>
        ))}
      </div>

      <div className="selection-info">
        {selectedSeats.length > 0 ? (
          <p>Selected: {selectedSeats.sort((a,b) => a-b).join(", ")}</p>
        ) : (
          <p className="hint">Click seats to select</p>
        )}
      </div>

      <button 
        className={`proceed-btn ${selectedSeats.length ? "active" : ""}`}
        onClick={handleProceed}
      >
        Continue
      </button>
    </div>
  );
};

export default SeatSelection;