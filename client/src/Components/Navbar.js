import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

// MUI Stuff

function Navbar() {
  return (
    <div className="container" >
      <Link to="/" className="site-title">
        <p  style={{ margin: '0'}}>TravelEasy</p>
      </Link>
      <div>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
