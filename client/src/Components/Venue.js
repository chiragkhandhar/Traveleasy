import React from "react";
import { Fragment } from "react";
import "../Styles/Venue.css";

// MUI Stuff
import Chip from "@material-ui/core/Chip";

// Icons

import { HiOutlineLocationMarker } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";

function Venue(props) {
  const venue = props.venue;
  const handleSave = () => {
    // Call API Here
  };

  const handleSimilar = () => {
    // Call API here
  };

  const handleVenueClick = () => {
    props.setVenueView(true, venue);
  };
  return (
    <Fragment>
      <div className="venue-container" onClick={handleVenueClick}>
        <p className="venue-name">{venue.name}</p>
        <div className="venue-location">
          <HiOutlineLocationMarker />
          <p className="venue-address">{`${venue.location.address}, ${venue.location.city}, ${venue.location.postalCode}`}</p>
        </div>
        <div className="venue-category">
          <VscGroupByRefType />
          <p className="venue-categoryname">
            {venue.categories[0] && venue.categories[0].shortName}
          </p>
        </div>
        <div className="venue-btns">
          <button className="venue-save" onClick={handleSave}>
            Save
          </button>
          <button className="venue-similar" onClick={handleSimilar}>
            View Similar
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Venue;
