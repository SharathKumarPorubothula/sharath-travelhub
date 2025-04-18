import React from "react";
import "./BusCard.css";

const BusCard = ({ bus }) => {
  return (
    <div className="bus-card">
      <h3>{bus.operator}</h3>
      <p>
        {bus.from} → {bus.to}
      </p>
      <p>Departure: {bus.departureTime}</p>
      <p>Arrival: {bus.arrivalTime}</p>
      <p>Price: ₹{bus.price}</p>
      <button>Select Seats</button>
    </div>
  );
};

export default BusCard;
