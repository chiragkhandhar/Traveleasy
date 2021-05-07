import React, { Component } from "react";

import "../Styles/ProfilePage.css";

// Components
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import { Fragment } from "react";

// Icons
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

export class Profile extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="profile-container">
          <div className="profile-details-wrapper">
            <p className="profile-title">Account</p>

            <p className="join-date">Joined on May 7, 2021</p>
            <p className="profile-name">Chirag Khandhar</p>

            <div className="email-wrapper">
              <HiOutlineMail />
              <p className="email-text">ckhandhar@hawk.iit.edu</p>
            </div>

            <div className="saved-places-title">
              <HiOutlineLocationMarker
                style={{ fontSize: "2rem", color: "#333333" }}
              />
              <p className="saved-places-text">My Saved Places</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
