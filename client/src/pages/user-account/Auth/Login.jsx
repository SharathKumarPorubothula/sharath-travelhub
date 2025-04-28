// import React from "react";
// import "./Login.css"; 
// import {useState} from "react";
// // import image from 'C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\assets\\login.png'


// const  Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [loginStatus, setLoginStatus] = useState(false);
  
// const submit= async(e)=>{
//   e.preventDefault();
//   var data=await fetch("http://localhost:5000/api/auth/login",{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify({
//       email,
//       password
//     })
//   });
//   var result=await data.json();
// console.log(result);
//   if(result.message== "Login successful"){
//     alert("Login Successful 200");
//     localStorage.setItem("authToken",result.Token);
//     localStorage.setItem("email",email);
//     window.location.href="/";
//   }else{
//     alert(result.message);
//   }
// }

//   return (
//         <div className="login-container">
//         <div className="login-image"></div>
//         <div className="login-form">
//           <h2>Login</h2>
//           <form>
//           <label htmlFor="email">Email</label>
//         <input type="email" 
//         placeholder="Enter your email"
//          id="email" 
//          onChange={(e) => setEmail(e.target.value)}
//          required /><br />

//         <label htmlFor="password">Password</label>
//         <input type="password" 
//         placeholder="Enter Your Password"
//          id="password" 
//          onChange={(e) => setPassword(e.target.value)}
//          required /><br />
//         <button type="submit" onClick={submit}>Login</button>
//           </form>
//         </div>
//       </div>
    
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import "./Login.css";
// import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../../../firebase";

// // You'll need to create this file

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Function to handle Google login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("Google User Info: ", user);
//       // You can access user info here, such as:
//       // user.email, user.displayName, user.photoURL
//       localStorage.setItem("authToken", user.refreshToken); // Firebase token
//       localStorage.setItem("email", user.email);

//       alert("Login successful with Google!");
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Google login error: ", error.message);
//       alert("Google Login Failed");
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     var data = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     var result = await data.json();
//     console.log(result);
//     if (result.message === "Login successful") {
//       alert("Login Successful 200");
//       localStorage.setItem("authToken", result.Token);
//       localStorage.setItem("email", email);
//       window.location.href = "/";
//     } else {
//       alert(result.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image"></div>
//       <div className="login-form">
//         <h2>Login</h2>
//         <form>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             id="email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <br />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             placeholder="Enter Your Password"
//             id="password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <br />

//           <button type="submit" onClick={submit}>
//             Login
//           </button>
//         </form>

//         {/* Google Login Button */}
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={handleGoogleLogin}>Login with Google</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




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
      // You can access user info here, such as:
      // user.email, user.displayName, user.photoURL
      localStorage.setItem("authToken", user.refreshToken); // Firebase token
      localStorage.setItem("email", user.email);

      alert("Login successful with Google!");
      window.location.href = "/";
    } catch (error) {
      console.error("Google login error: ", error.message);
      alert("Google Login Failed");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    var data = await fetch("http://localhost:5000/api/auth/login", {
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
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  };

  const Guest=async (e) => {
    e.preventDefault();
    var data = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:"Psharathkumar21@gmail.com",
        password:"Naruto@148",
      }),
    });

    var result = await data.json();
    console.log(result);
    if (result.message === "Login successful") {
      alert("Login Successful");
      localStorage.setItem("authToken", result.Token);
      localStorage.setItem("email", email);
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

          <button type="submit" onClick={submit}>
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
        <p style={{color:"green"}}>---------------------------------------OR--------------------------------------</p>
        <div style={{ marginTop: "20px" }}>
          <button onClick={Guest}>Guest</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
