import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import logo from "../assets/images/apply-uni-logo.png";
import "../assets/style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">

          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="ApplyUni Logo" className="logo-icon" />
          </div>

          {/* Menu */}
          <ul className="nav-menu">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/student">Student</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/network">Network</Link></li>

            {/* Show dashboard only when logged in */}
            {token && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
          </ul>

          {/* Right Section */}
          <div className="nav-right">

            {/* Search Box */}
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <span className="search-icon"><FaSearch /></span>
            </div>

            {/* Auth Buttons */}
            {!token ? (
              /* LOGIN (when NOT logged in) */
              <div className="login-wrapper">
                <Link to="/login">
                  <button className="login-btn">
                    Login <FaChevronDown />
                  </button>
                </Link>
                <span className="login-subtitle">Student | Agent</span>
              </div>
            ) : (
              /* LOGOUT (when logged in) */
              <div className="login-wrapper">
                <button className="login-btn" onClick={handleLogout}>
                  <span className="text-xl">Logout</span>
                </button>
                
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
