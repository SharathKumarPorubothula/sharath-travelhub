import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaBus, FaSearch, FaQuestionCircle, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="brand-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="SharathTravels" className="logo" />
          <div className="brand-text">
            <h1 className="brand-name">SHARATH <span>TRAVELS</span></h1>
            <p className="tagline">Safe & Comfortable Journey</p>
          </div>
        </Link>
      </div>
      
      <nav className="main-nav">
        <Link to="/search" className="nav-link">
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </Link>
        <Link to="/help" className="nav-link">
          <FaQuestionCircle className="nav-icon" />
          <span>Help</span>
        </Link>
        <Link to="/profile" className="nav-link">
          <FaUserCircle className="nav-icon" />
          <span>Account</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;