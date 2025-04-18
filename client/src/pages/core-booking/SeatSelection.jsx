import React, { useState } from "react";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceed = () => {
    // Navigate to passenger details page or perform any action
    alert(`You have selected seats: ${selectedSeats.join(", ")}`);
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
