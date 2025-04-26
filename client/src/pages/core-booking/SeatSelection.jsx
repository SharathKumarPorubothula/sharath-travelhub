import React, { useState } from "react";
import "./SeatSelection.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SeatSelection = () => {

  const location = useLocation();
  const { bus,date } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

   const navigate = useNavigate();
   const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
    }else{
      alert("Seats selected: " + selectedSeats.join(", "));
    }
    navigate("/passenger-details", {
      state: {
        bus,
        date,
        selectedSeats,
      },
    });
  };

  return (
    <div className="seat-selection">
      <h2>Select Your Seat</h2>
      <div className="seat-grid">
        {seats.map((seat) => (
          <div
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <button onClick={handleProceed} className="proceed-btn">
        Proceed
      </button>
    </div>
  );
};

export default SeatSelection;
