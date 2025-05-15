import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/assets/logo.png";
import { FaSearch, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
    setShowHelpMenu(false);
  };

  const toggleHelpMenu = () => {
    setShowHelpMenu((prev) => !prev);
    setShowAccountMenu(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowAccountMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="brand-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="SharathTravels" className="logo" />
          <div className="brand-text">
            <h1 className="brand-name">
              SHARATH <span>TRAVELS</span>
            </h1>
            <p className="tagline">Safe & Comfortable Journey</p>
          </div>
        </Link>
      </div>

      <nav className="main-nav">
        <Link to="/search" className="nav-link">
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </Link>

        <div className="nav-link help-menu" onClick={toggleHelpMenu}>
          <FaQuestionCircle className="nav-icon" />
          <span>Help</span>
          {showHelpMenu && (
            <div className="dropdown">
              <Link to="/help/cancel-ticket" className="dropdown-item">Cancel Ticket</Link>
              <Link to="/help/reschedule" className="dropdown-item">Reschedule</Link>
              <Link to="/help/show-ticket" className="dropdown-item">Show Ticket</Link>
              <Link to='/help/contact' className="dropdown-item">Contact Us</Link>
            </div>
          )}
        </div>

        <div className="nav-link account-menu" onClick={toggleAccountMenu}>
          <FaUserCircle className="nav-icon" />
          <span>{isLoggedIn ? 'My Account' : 'Account'}</span>
          {showAccountMenu && (
            <div className="dropdown">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  <Link to="/my-bookings" className="dropdown-item">My Bookings</Link>
                  <Link to="/saved-payments" className="dropdown-item">Saved Payments</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={handleLogin} className="dropdown-item login-btn">Login</button>
                  <Link to="/register" className="dropdown-item">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;