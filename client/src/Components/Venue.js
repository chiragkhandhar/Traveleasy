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
  return (
    <Fragment>
      <div className="venue-container">
        <p className="venue-name">{venue.name}</p>
        <div className="venue-location">
          <HiOutlineLocationMarker />
          <p className="venue-address">{`${venue.location.address}, ${venue.location.city}`}</p>
        </div>
        <div className="venue-category">
          <VscGroupByRefType />
          <p className="venue-categoryname">
            {venue.categories[0] && venue.categories[0].shortName}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Venue;
