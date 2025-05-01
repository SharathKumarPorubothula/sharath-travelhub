
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PassengerDetails.css";
import { useNavigate } from "react-router-dom";

const PassengerDetails = () => {
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const location = useLocation();
  const { bus, date, selectedSeats } = location.state || {};

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const newErrors = {};
    let isValid = true;

    if (!passenger.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!passenger.age || passenger.age < 1 || passenger.age > 100) {
      newErrors.age = "Age must be between 1 and 100.";
      isValid = false;
    }

    if (!passenger.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!passenger.email || !emailPattern.test(passenger.email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!passenger.phone || !phonePattern.test(passenger.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent actual form submission

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
    } else if (handleValidation()) {
      alert("Passenger details submitted: " + JSON.stringify(passenger));
      navigate("/payment", {
        state: {
          bus,
          date,
          selectedSeats,
          passenger,
        },
      });
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div className="passenger-details">
      <h2>Enter Passenger Details</h2>

      {bus && (
        <div className="bus-summary">
          <p><span>Bus:</span> <span>{bus.name} ({bus.type})</span></p>
          <p><span>Date:</span> <span>{new Date(date).toLocaleDateString()}</span></p>
          <p><span>Seats Numbers:</span> <span>{selectedSeats.join(', ')}</span></p>
          <p><span>Departure:</span> <span>{bus.departureTime}</span></p>
          <p><span>ArrivalTime:</span> <span>{bus.arrivalTime}</span></p>
        </div>
      )}

      <form>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={passenger.name}
          onChange={handleChange} 
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input 
          type="number" 
          name="age" 
          placeholder="Age" 
          min="1" 
          max="100"
          value={passenger.age}
          onChange={handleChange} 
        />
        {errors.age && <p className="error">{errors.age}</p>}

        <select 
          name="gender" 
          value={passenger.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={passenger.email}
          onChange={handleChange} 
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          value={passenger.phone}
          onChange={handleChange} 
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <button onClick={handleSubmit} type="submit" className="submit-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default PassengerDetails;
