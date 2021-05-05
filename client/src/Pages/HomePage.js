import React, { Component } from "react";
import "../Styles/HomePage.css";

// Components
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";

// MUI Stuff

// Icons
import { FaBeer } from "react-icons/fa";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner />
      </div>
    );
  }
}

export default HomePage;
