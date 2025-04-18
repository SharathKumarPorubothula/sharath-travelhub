import React from "react";
import  { useEffect, useState } from "react";
import BusCard from "C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\components\\bus\\BusCard.jsx";
import BusFilters from 'C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\components\\bus\\BusFilters.jsx';

const SearchResults = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Simulated API call (replace with real API call)
    const dummyBuses = [
      {
        id: 1,
        operator: "TSRTC",
        from: "Hyderabad",
        to: "Vijayawada",
        departureTime: "06:00 AM",
        arrivalTime: "10:00 AM",
        price: 450,
      },
      {
        id: 2,
        operator: "Orange Travels",
        from: "Hyderabad",
        to: "Vijayawada",
        departureTime: "07:30 AM",
        arrivalTime: "11:45 AM",
        price: 500,
      },
    ];
    setBuses(dummyBuses);
  }, []);

  return (
    <div className="search-results">
      <BusFilters />
      <div className="bus-list">
        {buses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
