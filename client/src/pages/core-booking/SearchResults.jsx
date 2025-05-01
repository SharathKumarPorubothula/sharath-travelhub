import React, { useEffect, useState } from "react";
import BusCard from "C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\components\\bus\\BusCard.jsx";
import './SearchResults.css'

const SearchResults = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

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
    filterBuses(source, destination, type);
  };

  const handleSourceChange = (e) => {
    const src = e.target.value;
    setSource(src);
    filterBuses(src, destination, selectedType);
  };

  const handleDestinationChange = (e) => {
    const dest = e.target.value;
    setDestination(dest);
    filterBuses(source, dest, selectedType);
  };

  const filterBuses = (src, dest, type) => {
    let filtered = buses;

    if (src) {
      filtered = filtered.filter(bus =>
        bus.source.toLowerCase().includes(src.toLowerCase())
      );
    }

    if (dest) {
      filtered = filtered.filter(bus =>
        bus.destination.toLowerCase().includes(dest.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter(bus => bus.type === type);
    }

    setFilteredBuses(filtered);
  };

  return (
    <div className="search-results">
      {/* Source and Destination Inputs */}
      <div className="search-filters">
        <div className="filter-row">
          <p>Search here</p>
          <input
            type="text"
            placeholder="Enter Source City"
            value={source}
            onChange={handleSourceChange}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Enter Destination City"
            value={destination}
            onChange={handleDestinationChange}
            className="filter-input"
          />
        </div>

        {/* Filter by Bus Type Dropdown */}
        <div className="filter-row">
          <label htmlFor="busType" className="filter-label">
            Filter by Bus Type:
          </label>
          <select
            id="busType"
            value={selectedType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="AC Sleeper">AC Sleeper</option>
            <option value="Volvo Multi-Axle">Volvo Multi-Axle</option>
            <option value="Non-AC Seater">Non-AC Seater</option>
          </select>
        </div>
      </div>

      {/* Bus List */}
      <div className="bus-list">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => <BusCard key={bus._id} bus={bus} />)
        ) : (
          <p className="no-buses">No buses found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
