import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} SharathTravels</p>
        <ul className="footer-links">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Help</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;