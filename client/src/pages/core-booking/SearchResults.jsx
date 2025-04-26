import React, { useEffect, useState } from "react";
import BusCard from "C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\components\\bus\\BusCard.jsx";

const SearchResults = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/buses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBuses(data);
        setFilteredBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBuses();
  }, []);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setFilteredBuses(type === "" ? buses : buses.filter(bus => bus.type === type));
  };

  return (
    <div className="search-results">
      {/* Filter dropdown with styled options */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="busType" style={{ marginRight: "10px", fontWeight: "500" }}>Filter by Bus Type:</label>
        <select 
          id="busType" 
          value={selectedType} 
          onChange={handleFilterChange}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f8f8f8",
            fontSize: "16px",
            cursor: "pointer",
            outline: "none",
            width: "200px",
            transition: "all 0.3s ease"
          }}
        >
          <option value="" style={{ padding: "8px", backgroundColor: "#f8f8f8" }}>All Types</option>
          <option 
            value="AC Sleeper" 
            style={{ 
              padding: "8px", 
              backgroundColor: "#f8f8f8",
              borderBottom: "1px solid #eee"
            }}
          >
            AC Sleeper
          </option>
          <option 
            value="Volvo Multi-Axle" 
            style={{ 
              padding: "8px", 
              backgroundColor: "#f8f8f8",
              borderBottom: "1px solid #eee"
            }}
          >
            Volvo Multi-Axle
          </option>
          <option 
            value="Non-AC Seater" 
            style={{ padding: "8px", backgroundColor: "#f8f8f8" }}
          >
            Non-AC Seater
          </option>
        </select>
      </div>

      {/* Bus List */}
      <div className="bus-list">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => <BusCard key={bus._id} bus={bus} />)
        ) : (
          <p>No buses found for selected type.</p>
        )}
      </div>

      {/* Optional: Add hover effects */}
      <style>
        {`
          #busType:hover {
            border-color: #888;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
          }
          #busType option:hover {
            background-color: #e0e0e0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default SearchResults;