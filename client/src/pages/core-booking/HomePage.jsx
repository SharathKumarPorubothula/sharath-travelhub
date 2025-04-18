import React, { useState } from "react";
import "./HomePage.css";
import { FaBus, FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const HomePage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    console.log({ from, to, date });
    // Add your search logic here
  };

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Seamless Bus Travel <span>Bookings</span></h1>
          <p>Discover the easiest way to book bus tickets across India</p>
          
          <div className="search-container">
  <div className="search-widget">
    <div className="input-group">
      <input 
        type="text" 
        placeholder="Departure City" 
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
    </div>
    
    <div className="input-group">
      <input 
        type="text" 
        placeholder="Destination City" 
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
    </div>
    
    <div className="input-group">
      <FaCalendarAlt className="input-icon" />
      <input 
        type="date" 
        placeholder="Travel Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
    
    <button onClick={handleSearch} className="search-btn">
      <FaSearch /> Find Buses
    </button>
  </div>
</div>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon-container">
                <FaBus className="feature-icon" />
              </div>
              <div className="feature-text">
                <h3>10,000+</h3>
                <p>Buses</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-container">
                <FaBus className="feature-icon" />
              </div>
              <div className="feature-text">
                <h3>2,000+</h3>
                <p>Routes</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-container">
                <FaBus className="feature-icon" />
              </div>
              <div className="feature-text">
                <h3>1M+</h3>
                <p>Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;