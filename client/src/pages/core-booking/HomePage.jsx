import React, {  useState } from "react";
import "./HomePage.css";
import { FaBus, FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import images from 'C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\assets\\bus.png'
import { useNavigate } from "react-router-dom";
import OSRMRouteMap from "../../assets/OSMMaps";
import { useRef } from "react";

//  app.jsx-->Homepage.jsx-->

const HomePage = () => {
  const [from, setFrom] = useState(""); 
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]); 

  const bottomButtonRef = useRef(null);
 
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
    bottomButtonRef.current.scrollIntoView({ behavior: "smooth" });
    
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
                  // value={from}
                  // onChange={(e) => setFrom(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    setFrom(capitalized);
                  }}
                  // style={{textTransform: 'capitalize'}}
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Destination City" 
                  // value={to}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    setTo(capitalized);
                  }}
                
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
              
              <button onClick={handleSearch}  className="search-btn">
                <FaSearch /> Find Buses
              </button>
            </div>
          </div>

          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '10px'}}>
  <strong>Note:</strong> Only the routes listed below are available. Please select from them.
</div>

          {/* <TomTomMap /> */}
          {/* <OSRMRouteMap startLocation="Hyderabad" endLocation="Pune" /> */}
         {/* {(from && to)?<div>{(from=="Pune" && to=="Mysore")&&<OSRMRouteMap startLocation="Pune" endLocation="Mysore" />}
         {(from=="Hyderabad" && to=="Ahmedabad")&&<OSRMRouteMap startLocation="Hyderabad" endLocation="Ahmedabad" />}
         {(from=="Hyderabad" && to=="Chennai")&&<OSRMRouteMap startLocation="Hyderabad" endLocation="Chennai" />}
         {(from=="Goa" && to=="Chennai")&&<OSRMRouteMap startLocation="Goa" endLocation="Chennai" />}
         {(from=="Mysore" && to=="Delli")&&<OSRMRouteMap startLocation="Mysore" endLocation="Delli" />}
         {(from=="Mysore" && to=="Pune")&&<OSRMRouteMap startLocation="Mysore" endLocation="Pune" />}
         {(from=="Coimbatore" && to=="Goa")&&<OSRMRouteMap startLocation="Coimbatore" endLocation="Goa" />}
         {(from=="Bangalore" && to=="Hyderabad")&&<OSRMRouteMap startLocation="Bangalore" endLocation="Hyderabad" />}
         {(from=="Mumbai" && to=="Bangalore")&&<OSRMRouteMap startLocation="Mumbai" endLocation="Bangalore" />}
         {(from=="Chennai" && to=="Mumbai")&&<OSRMRouteMap startLocation="Chennai" endLocation="Mumbai" />}
         {(from=="Delhi" && to=="Pune")&&<OSRMRouteMap startLocation="Delhi" endLocation="Pune" />}
         {(from=="Hyderabad" && to=="Mysore")&&<OSRMRouteMap startLocation="Hyderabad" endLocation="Mysore" />}
         </div>:<OSRMRouteMap startLocation="Hyderabad" endLocation="Pune" />} */}



{(from && to) ? (
  <div>
    {(from=="Pune" && to=="Mysore") && <OSRMRouteMap startLocation="Pune" endLocation="Mysore" />}
    {(from=="Pune" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Pune" endLocation="Ahmedabad" />}
    {(from=="Pune" && to=="Coimbatore") && <OSRMRouteMap startLocation="Pune" endLocation="Coimbatore" />}
    {(from=="Pune" && to=="Delhi") && <OSRMRouteMap startLocation="Pune" endLocation="Delhi" />}
    {(from=="Pune" && to=="Goa") && <OSRMRouteMap startLocation="Pune" endLocation="Goa" />}
    {(from=="Pune" && to=="Mumbai") && <OSRMRouteMap startLocation="Pune" endLocation="Mumbai" />}
    
    {(from=="Hyderabad" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Ahmedabad" />}
    {(from=="Hyderabad" && to=="Chennai") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Chennai" />}
    {(from=="Hyderabad" && to=="Delhi") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Delhi" />}
    {(from=="Hyderabad" && to=="Mysore") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Mysore" />}
    {(from=="Hyderabad" && to=="Bangalore") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Bangalore" />}
    {(from=="Hyderabad" && to=="Mumbai") && <OSRMRouteMap startLocation="Hyderabad" endLocation="Mumbai" />}
    
    {(from=="Goa" && to=="Chennai") && <OSRMRouteMap startLocation="Goa" endLocation="Chennai" />}
    {(from=="Goa" && to=="Coimbatore") && <OSRMRouteMap startLocation="Goa" endLocation="Coimbatore" />}
    {(from=="Goa" && to=="Hyderabad") && <OSRMRouteMap startLocation="Goa" endLocation="Hyderabad" />}
    {(from=="Goa" && to=="Delhi") && <OSRMRouteMap startLocation="Goa" endLocation="Delhi" />}
    {(from=="Goa" && to=="Mumbai") && <OSRMRouteMap startLocation="Goa" endLocation="Mumbai" />}
    {(from=="Goa" && to=="Bangalore") && <OSRMRouteMap startLocation="Goa" endLocation="Bangalore" />}
    {(from=="Goa" && to=="Mysore") && <OSRMRouteMap startLocation="Goa" endLocation="Mysore" />}
    
    {(from=="Mysore" && to=="Delhi") && <OSRMRouteMap startLocation="Mysore" endLocation="Delhi" />}
    {(from=="Mysore" && to=="Bangalore") && <OSRMRouteMap startLocation="Mysore" endLocation="Bangalore" />}
    {(from=="Mysore" && to=="Goa") && <OSRMRouteMap startLocation="Mysore" endLocation="Goa" />}
    {(from=="Mysore" && to=="Chennai") && <OSRMRouteMap startLocation="Mysore" endLocation="Chennai" />}
    {(from=="Mysore" && to=="Mumbai") && <OSRMRouteMap startLocation="Mysore" endLocation="Mumbai" />}
    {(from=="Mysore" && to=="Coimbatore") && <OSRMRouteMap startLocation="Mysore" endLocation="Coimbatore" />}
    {(from=="Mysore" && to=="Hyderabad") && <OSRMRouteMap startLocation="Mysore" endLocation="Hyderabad" />}
    {(from=="Mysore" && to=="Pune") && <OSRMRouteMap startLocation="Mysore" endLocation="Pune" />}
    
    {(from=="Coimbatore" && to=="Delhi") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Delhi" />}
    {(from=="Coimbatore" && to=="Chennai") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Chennai" />}
    {(from=="Coimbatore" && to=="Mumbai") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Mumbai" />}
    {(from=="Coimbatore" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Ahmedabad" />}
    {(from=="Coimbatore" && to=="Bangalore") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Bangalore" />}
    {(from=="Coimbatore" && to=="Mysore") && <OSRMRouteMap startLocation="Coimbatore" endLocation="Mysore" />}
    
    {(from=="Bangalore" && to=="Chennai") && <OSRMRouteMap startLocation="Bangalore" endLocation="Chennai" />}
    {(from=="Bangalore" && to=="Coimbatore") && <OSRMRouteMap startLocation="Bangalore" endLocation="Coimbatore" />}
    {(from=="Bangalore" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Bangalore" endLocation="Ahmedabad" />}
    {(from=="Bangalore" && to=="Mysore") && <OSRMRouteMap startLocation="Bangalore" endLocation="Mysore" />}
    {(from=="Bangalore" && to=="Delhi") && <OSRMRouteMap startLocation="Bangalore" endLocation="Delhi" />}
    {(from=="Bangalore" && to=="Mumbai") && <OSRMRouteMap startLocation="Bangalore" endLocation="Mumbai" />}
    {(from=="Bangalore" && to=="Hyderabad") && <OSRMRouteMap startLocation="Bangalore" endLocation="Hyderabad" />}
    
    {(from=="Mumbai" && to=="Hyderabad") && <OSRMRouteMap startLocation="Mumbai" endLocation="Hyderabad" />}
    {(from=="Mumbai" && to=="Mysore") && <OSRMRouteMap startLocation="Mumbai" endLocation="Mysore" />}
    {(from=="Mumbai" && to=="Goa") && <OSRMRouteMap startLocation="Mumbai" endLocation="Goa" />}
    {(from=="Mumbai" && to=="Delhi") && <OSRMRouteMap startLocation="Mumbai" endLocation="Delhi" />}
    
    {(from=="Chennai" && to=="Goa") && <OSRMRouteMap startLocation="Chennai" endLocation="Goa" />}
    {(from=="Chennai" && to=="Delhi") && <OSRMRouteMap startLocation="Chennai" endLocation="Delhi" />}
    {(from=="Chennai" && to=="Bangalore") && <OSRMRouteMap startLocation="Chennai" endLocation="Bangalore" />}
    {(from=="Chennai" && to=="Mumbai") && <OSRMRouteMap startLocation="Chennai" endLocation="Mumbai" />}
    {(from=="Chennai" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Chennai" endLocation="Ahmedabad" />}
    {(from=="Chennai" && to=="Hyderabad") && <OSRMRouteMap startLocation="Chennai" endLocation="Hyderabad" />}
    {(from=="Chennai" && to=="Coimbatore") && <OSRMRouteMap startLocation="Chennai" endLocation="Coimbatore" />}
    
    {(from=="Delhi" && to=="Hyderabad") && <OSRMRouteMap startLocation="Delhi" endLocation="Hyderabad" />}
    {(from=="Delhi" && to=="Goa") && <OSRMRouteMap startLocation="Delhi" endLocation="Goa" />}
    {(from=="Delhi" && to=="Ahmedabad") && <OSRMRouteMap startLocation="Delhi" endLocation="Ahmedabad" />}
    {(from=="Delhi" && to=="Bangalore") && <OSRMRouteMap startLocation="Delhi" endLocation="Bangalore" />}
    {(from=="Delhi" && to=="Pune") && <OSRMRouteMap startLocation="Delhi" endLocation="Pune" />}
  </div>
) : (
  <OSRMRouteMap startLocation="Hyderabad" endLocation="Pune" />
)}


          
          
          {/* Display the search results (if any) */}
          {buses.length === 0 ? (
  <div className="no-buses">
    <h2>🚌 "Check Where Our Buses Travel!"</h2>
    <img src={images} alt="No Buses Found" style={{ width: '60%', height: 'auto' }} />
  </div>
) : (
            <div className="bus-results">
              <h2 ref={bottomButtonRef}>Available Buses</h2>
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
