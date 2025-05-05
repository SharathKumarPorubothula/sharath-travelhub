import React from "react";
import "./Footer.css";
import {Link,useNavigate} from 'react-router-dom'

const Footer = () => {
  const navigator=useNavigate()
  const term=()=>{
navigator('/term')
  }
  const privacy=()=>{
    navigator('/privacy')
  }
  // to="/help"
  const help=()=>{
    navigator("/help")
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} SharathTravels</p>
        <ul className="footer-links">
        <li onClick={term}>Terms </li>
        <li onClick={privacy} >Privacy</li>
          <li onClick={help}>Help</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;