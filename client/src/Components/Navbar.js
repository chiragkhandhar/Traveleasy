import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

// MUI Stuff

function Navbar() {
  return (
    <div className="container">
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="signup-btn">Signup</button>
      </Link>
    </div>
  );
}

export default Navbar;
