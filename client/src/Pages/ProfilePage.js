import React, { Component } from "react";
import { Fragment } from "react";
import axios from "axios";

import "../Styles/ProfilePage.css";

// Components
import Navbar from "../Components/Navbar";
import SavedVenue from "../Components/SavedVenue";

// Icons
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

export class Profile extends Component {
  state = {
    profile: {},
  };
  componentDidMount = () => {
    this.api_getUserProfile();
  };

  getFormattedDate = (input_date) => {
    const date = input_date.getDate();
    const month = input_date.getMonth() + 1;
    const year = input_date.getFullYear();
    return `${year}-${month}-${date}`;
  };
  api_getUserProfile = () => {
    const token = localStorage.getItem("token");
    const access_token = `Bearer ${token}`;
    const URI = "/api/user/profile";

    axios
      .get(URI, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        this.setState({
          profile: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { profile } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className="profile-container">
          <div className="profile-details-wrapper">
            <p className="profile-title">Account</p>

            <p className="join-date">
              Joined on {this.getFormattedDate(new Date(profile.createdAt))}
            </p>
            <p className="profile-name">{`${profile.firstname} ${profile.lastname}`}</p>

            <div className="email-wrapper">
              <HiOutlineMail />
              <p className="email-text">{profile.email}</p>
            </div>

            <div className="saved-places-title">
              <HiOutlineLocationMarker
                style={{ fontSize: "2rem", color: "#333333" }}
              />
              <p className="saved-places-text">My Saved Places</p>
            </div>

            <div className="saved-wrapper">
              {profile.savedPlaces &&
                profile.savedPlaces.map((place) => (
                  <SavedVenue
                    key={place.id}
                    place={place}
                    api_getUserProfile={this.api_getUserProfile}
                  />
                ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
