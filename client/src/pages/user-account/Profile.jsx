import React, { useState} from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", OEmail: "" });

  // Fetch user profile when component mounts
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, {
  //         withCredentials: true, // if using cookies for auth
  //       });
  //       setProfile(res.data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lemail=localStorage.getItem("email");
      // const luser=localStorage.getItem("user");
      const updatedProfile = { ...profile, OEmail: lemail };
     const res= await axios.put(`http://localhost:5000/api/auth/profile`, updatedProfile);
    

     localStorage.setItem("email",res.data.newEmail)
     localStorage.setItem("userName",res.data.newUserName)
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    
    <div className="profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name: 
          <input 
            type="text" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            placeholder={localStorage.getItem("userName")}
            required 
          />
        </label>
        <br />
        <label>
          Email: 
          <input 
            type="email" 
            name="email" 
            value={profile.email} 
            onChange={handleChange} 
            placeholder={localStorage.getItem("email")}
            required 
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;
