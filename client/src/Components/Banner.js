import React from "react";

import "../Styles/Banner.css";

// MUI Stuff

function Banner() {
  return (
    <div className="page-banner">
      <img
        className="pb-img"
        src="https://source.unsplash.com/random"
        alt="banner image"
      />
      <div className="pb-overlay">
        <p className="pb-title">
          Discover the world and plan the perfect trip.
        </p>
      </div>
    </div>
  );
}

export default Banner;
