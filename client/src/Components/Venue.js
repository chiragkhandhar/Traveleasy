import React from "react";
import { Fragment, useState } from "react";
import "../Styles/Venue.css";
import axios from "axios";

// MUI Stuff
import Chip from "@material-ui/core/Chip";

// Icons

import { HiOutlineLocationMarker } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";
import { STATES } from "mongoose";

function Venue(props) {
  const [venue, setVenue] = useState(props.venue);
  const handleSave = () => {
    // Call API Here
  };

  const handleSimilar = () => {
    // Call API here
  };

  const api_getVenueDetails = () => {
    const id = venue.id;
    const token = localStorage.getItem("token");
    const access_token = `Bearer ${token}`;
    const URI = `/api/venue/${id}`;

    axios
      .get(URI, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        setVenue(res.data.response.venue);
        props.setVenueView(true, res.data.response.venue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVenueClick = () => {
    api_getVenueDetails();
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
