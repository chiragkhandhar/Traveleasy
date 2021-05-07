import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

// MUI Stuff
import Avatar from "@material-ui/core/Avatar";

function Navbar() {
  return (
    <div className="container">
      <Link to="/" className="site-title">
        <p style={{ margin: "0" }}>TravelEasy</p>
      </Link>
      <div className="end-nav-btns">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Signup</button>
        </Link>
        <Link to="/profile" className="profile-avatar">
          <Avatar>H</Avatar>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
