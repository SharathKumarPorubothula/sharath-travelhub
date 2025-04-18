// client/src/pages/core-booking/PassengerDetails.jsx
import React, { useState } from "react";

const PassengerDetails = () => {
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  return (
    <div className="passenger-details">
      <h2>Enter Passenger Details</h2>
      <form>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
      </form>
    </div>
  );
};

export default PassengerDetails;
