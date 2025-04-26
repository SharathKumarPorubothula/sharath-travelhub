import React from "react";
import "./Profile.css"; // Assuming you have a CSS file for styling

const Profile = () => {
  return (
    <div className="profile">
      <h2>Edit Profile</h2>
      <form>
        <label>Name: <input type="text" placeholder="Enter name" /></label><br />
        <label>Email: <input type="email" placeholder="Enter email" /></label><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;