import React, {  useState } from "react";
import "./HomePage.css";
import { FaBus, FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import images from 'C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\assets\\bus.png'
import { useNavigate } from "react-router-dom";
// import TomTomMap from "../../TomTomMap";
import OSRMRouteMap from "../../assets/OSMMaps"; // Adjust the import path as needed

 

const HomePage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]); 


 
  const handleSearch = async () => {
    const userData = localStorage.getItem("authToken");
    if(userData){
      // console.log({ from, to, date });
   const response = await fetch('http://localhost:5000/api/buses/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, date }),
    });
    const data = await response.json();
    setBuses(data);   
  }else{
    alert("Please login to search for buses.");
    navigate('/login');
  }
  };


  const navigate = useNavigate();

  const handleBookNow = (bus) => {
    navigate("/select-seat", { state: { bus, date } }); // Sending bus data
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

          {/* <TomTomMap /> */}
          {/* <OSRMRouteMap startLocation="Hyderabad" endLocation="Pune" /> */}
         {(from && to)?<div>{(from=="Pune" && to=="Mysore")&&<OSRMRouteMap startLocation="Pune" endLocation="Mysore" />}
         {(from=="Hyderabad" && to=="Ahmedabad")&&<OSRMRouteMap startLocation="Hyderabad" endLocation="Ahmedabad" />}
         {(from=="Hyderabad" && to=="Chennai")&&<OSRMRouteMap startLocation="Hyderabad" endLocation="Chennai" />}
         {(from=="Goa" && to=="Chennai")&&<OSRMRouteMap startLocation="Goa" endLocation="Chennai" />}
         {(from=="Mysore" && to=="Delli")&&<OSRMRouteMap startLocation="Mysore" endLocation="Delli" />}
         {(from=="Mysore" && to=="Pune")&&<OSRMRouteMap startLocation="Mysore" endLocation="Pune" />}
         {(from=="Coimbatore" && to=="Goa")&&<OSRMRouteMap startLocation="Coimbatore" endLocation="Goa" />}
         {(from=="Bangalore" && to=="Hyderabad")&&<OSRMRouteMap startLocation="Bangalore" endLocation="Hyderabad" />}
         {(from=="Mumbai" && to=="Bangalore")&&<OSRMRouteMap startLocation="Mumbai" endLocation="Bangalore" />}
         {(from=="Chennai" && to=="Mumbai")&&<OSRMRouteMap startLocation="Chennai" endLocation="Mumbai" />}
         {(from=="Delhi" && to=="Pune")&&<OSRMRouteMap startLocation="Delhi" endLocation="Pune" />}</div>:<OSRMRouteMap startLocation="Hyderabad" endLocation="Pune" />}


          
          
          {/* Display the search results (if any) */}
          {buses.length === 0 ? (
  <div className="no-buses">
    <h2>🚌 "Check Where Our Buses Travel!"</h2>
    <img src={images} alt="No Buses Found" style={{ width: '60%', height: 'auto' }} />
  </div>
) : (
            <div className="bus-results">
              <h2>Available Buses</h2>
              <div className="bus-list">
                {buses.map((bus) => (
                  <div key={bus._id} className="bus-item">
                    <h3>{bus.name} ({bus.type})</h3>
                    <p>{bus.source} to {bus.destination}</p>
                    <p>Departure: {bus.departureTime}</p>
                    <p>arrivalTime:{bus.arrivalTime}</p>
                    <p>Date:{date}</p>
                    <p>Price: ₹{bus.price}</p>
                    <button onClick={() => handleBookNow(bus)}>Book Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
