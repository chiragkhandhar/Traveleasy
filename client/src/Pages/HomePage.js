import React, { Component } from "react";
import "../Styles/HomePage.css";

// Components
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Searchbox from "../Components/Searchbox";
import MapHolder from "../Components/MapHolder";

// MUI Stuff

// Icons
import { FaBeer } from "react-icons/fa";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <div className="hp-sections">
          <div className="hp-section-1">
            <Searchbox/>
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
