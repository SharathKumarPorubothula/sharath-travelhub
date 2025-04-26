import React from "react";
import "./Login.css"; 
import {useState} from "react";
// import image from 'C:\\Users\\User\\Desktop\\SharathTravels\\client\\src\\assets\\login.png'


const  Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);
  
const submit= async(e)=>{
  e.preventDefault();
  var data=await fetch("http://localhost:5000/api/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  });
  var result=await data.json();
console.log(result);
  if(result.message== "Login successful"){
    alert("Login Successful 200");
    localStorage.setItem("authToken",result.Token);
    localStorage.setItem("email",email);
    window.location.href="/";
  }else{
    alert(result.message);
  }
}

  return (
        <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>Login</h2>
          <form>
          <label htmlFor="email">Email</label>
        <input type="email" 
        placeholder="Enter your email"
         id="email" 
         onChange={(e) => setEmail(e.target.value)}
         required /><br />

        <label htmlFor="password">Password</label>
        <input type="password" 
        placeholder="Enter Your Password"
         id="password" 
         onChange={(e) => setPassword(e.target.value)}
         required /><br />
        <button type="submit" onClick={submit}>Login</button>
          </form>
        </div>
      </div>
    
  );
}

export default Login;