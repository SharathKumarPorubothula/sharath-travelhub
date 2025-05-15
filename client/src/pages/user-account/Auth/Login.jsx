import React, { useState } from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase"; // Import auth and provider from firebase.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google User Info: ", user);
      
      localStorage.setItem("authToken", user.refreshToken); // Firebase token
      localStorage.setItem("emailName", user.email);
      localStorage.setItem("userName",user.displayName);
      
    

      alert("Login successful with Google!");
      window.location.href = "/";

      
    } catch (error) {
      console.error("Google login error: ", error.message);
      alert("Google Login Failed");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    var data = await fetch("https://sharath-travelhub.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    var result = await data.json();
    console.log(result);
    if (result.message === "Login successful") {
      alert("Login Successful");
      localStorage.setItem("authToken", result.Token);
      localStorage.setItem("email", email);
      localStorage.setItem("userName",result.userName);
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  };

  const Guest=async (e) => {
    e.preventDefault();
    // const Email="Psharathkumar21@gmail.com"
    // const Pass="Naruto@148"
    // setEmail("Psharathkumar21@gmail.com")
    // setPassword("Naruto@148")
    const email= "Psharathkumar21@gmail.com"
    const password= "Naruto@148"

    var data = await fetch("https://sharath-travelhub.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    var result = await data.json();
    console.log(result);
    if (result.message === "Login successful") {
      alert("Login Successful");
      localStorage.setItem("authToken", result.Token);
      localStorage.setItem("email", email);
      localStorage.setItem("userName",result.userName);
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="login-div">

          
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button type="submit" style={{marginTop:'20px'}} onClick={submit}>
            Login
          </button>

          </div>
          
        </form>

        {/* Google Login Button */}
        <div style={{ margin: "10px 0px" }}>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
        <p style={{color:"green", margin:'8px 0px'}}>---------------------------------------OR--------------------------------------</p>
        <div style={{ marginTop: "0px" }}>
          <button onClick={Guest}>Guest</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
