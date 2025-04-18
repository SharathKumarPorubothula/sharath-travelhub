import React from "react";
// import "./BusFilters.css";

const BusFilters = () => {
  return (
    <div className="bus-filters">
      <h4>Filters</h4>
      <label>
        <input type="checkbox" /> AC
      </label>
      <label>
        <input type="checkbox" /> Non-AC
      </label>
      <label>
        <input type="checkbox" /> Sleeper
      </label>
    </div>
  );
};

export default BusFilters;
