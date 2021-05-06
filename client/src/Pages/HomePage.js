import React, { Component } from "react";
import "../Styles/HomePage.css";

// Components
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Searchbox from "../Components/Searchbox";
import MapHolder from "../Components/MapHolder";

// MUI Stuff
import Chip from "@material-ui/core/Chip";

// Icons
import { MdMyLocation } from "react-icons/md";

export class HomePage extends Component {
  state = {
    lat: 0,
    lon: 0,
    location: null,
  };

  componentDidMount = () => {
    this.getGeoLocation();
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

  api_reverseGeocode = () => {
    const key = "pk.40371e3318703eab896c664d24b12688";
    const uri = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${this.state.lat}&lon=${this.state.lon}&format=json`;
    fetch(uri)
      .then((response) => response.json())
      .then((object) => {
        this.setState({ location: object });
      })
      .catch((err) => console.log("Location not retreived"));
  };

  render() {
    const { location } = this.state;
    return (
      <div>
        <Navbar />
        <Banner />
        <div className="hp-sections">
          <div className="hp-section-1">
            <Searchbox />
            <Chip
              icon={<MdMyLocation />}
              label={location !== null ? location.address.city : "Locate me"}
              onClick={this.getGeoLocation}
              variant="outlined"
              size="small"
            />
          </div>
          <div className="hp-section-2">
            <MapHolder />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
