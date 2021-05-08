import React, { Component } from "react";
import "../Styles/HomePage.css";
import axios from "axios";

// Components
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Searchbox from "../Components/Searchbox";
import MapHolder from "../Components/MapHolder";
import OpenVenue from "../Components/OpenVenue";
import Venue from "../Components/Venue";

// MUI Stuff
import Chip from "@material-ui/core/Chip";

// Icons
import { MdMyLocation } from "react-icons/md";

export class HomePage extends Component {
  state = {
    token: "",
    isLoggedIn: false,

    lat: 0,
    lon: 0,
    location: null,
    locationSearchText: "",
    querySearchText: "",
    venues: [],

    openView: false,
    openVenue: {},
  };

  componentDidMount = () => {
    this.getGeoLocation();

    if (localStorage.getItem("token")) {
      this.setState({
        token: localStorage.getItem("token"),
        isLoggedIn: true,
      });
    }
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      token: "",
      isLoggedIn: false,
    });
  };

  handleLocationClick = () => {
    console.log("Location Clicked");
    this.getGeoLocation();
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.setState({
          lat: latitude,
          lon: longitude,
        });
        this.api_reverseGeocode();
      });
    }
  };

  setVenues = (newVenues) => {
    this.setState({
      venues: newVenues,
    });
  };

  setVenueView = (flag, venue) => {
    this.setState({
      openView: flag,
      openVenue: venue,
    });
  };

  api_reverseGeocode = () => {
    const key = "pk.40371e3318703eab896c664d24b12688";
    const uri = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${this.state.lat}&lon=${this.state.lon}&format=json`;
    fetch(uri)
      .then((response) => response.json())
      .then((object) => {
        this.setState({ location: object });
        this.api_LatLonQuery();
      })
      .catch((err) => console.log("Location not retreived"));
  };

  api_LatLonQuery = () => {
    const URI = `/api/places/${this.state.lat},${this.state.lon}/${this.state.querySearchText}`;
    axios
      .get(URI)
      .then((res) => {
        this.setState({
          venues: res.data.response.venues,
        });
        console.log(res.data.response.venues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { isLoggedIn, location, venues, openView, openVenue } = this.state;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={this.handleLogout} />
        <Banner />
        <div className="hp-sections">
          <div className="hp-section-1">
            <Searchbox setVenues={this.setVenues} />
            <Chip
              icon={<MdMyLocation />}
              label={location !== null ? location.address.city : "Locate me"}
              onClick={this.getGeoLocation}
              variant="outlined"
              size="small"
            />
            <div className="hp-title-wrapper">
              <p className="hp-title">Places to check,</p>
              <button className="recommed-btn">My Recommendations</button>
            </div>

            {venues &&
              venues.map((venue) => (
                <Venue
                  key={venue.id}
                  venue={venue}
                  setVenueView={this.setVenueView}
                />
              ))}
          </div>
          <div className="hp-section-2">
            {openView ? (
              <OpenVenue
                openVenue={openVenue}
                setVenueView={this.setVenueView}
              />
            ) : (
              <MapHolder venues={venues} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
