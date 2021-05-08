import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

// MUI Stuff
import Avatar from "@material-ui/core/Avatar";

function Navbar(props) {
  const isLoggedIn = props.isLoggedIn;

  const handleLogout = () => {
    props.handleLogout();
  };
  return (
    <div className="container">
      <Link to="/" className="site-title">
        <p style={{ margin: "0" }}>TravelEasy</p>
      </Link>
      <div className="end-nav-btns">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="signup-btn">Signup</button>
          </Link>
        )}
        {isLoggedIn && (
          <button className="signup-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
        {isLoggedIn && (
          <Link to="/profile" className="profile-avatar">
            <Avatar>C</Avatar>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
