import React from "react";
import { Fragment, useState } from "react";
import "../Styles/Venue.css";
import axios from "axios";

// MUI Stuff

// Icons

import { HiOutlineLocationMarker } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";

function Venue(props) {
  const [venue, setVenue] = useState(props.venue);
  const token = localStorage.getItem("token");

  const handleSave = () => {
    const URI = `/api/saveplace/`;
    const access_token = `Bearer ${token}`;
    const body = {
      place: venue,
    };

    axios
      .post(URI, body, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleSimilar = () => {
    const id = venue.id;
    const URI = `/api/venue/similar/${id}`;
    // Call API here
    axios
      .get(URI)
      .then((res) => {
        console.log(res);
        props.setVenues(res.data.response.similarVenues.items); // Verify this line
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api_getVenueDetails = () => {
    const id = venue.id;
    const access_token = `Bearer ${token}`;
    const URI = `/api/venue/${id}`;

    axios
      .get(URI, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res);
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
      <div className="venue-container">
        <p className="venue-name" onClick={handleVenueClick}>
          {venue.name}
        </p>
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
          {token && (
            <button className="venue-save" onClick={handleSave}>
              Save
            </button>
          )}
          <button className="venue-similar" onClick={handleSimilar}>
            View Similar
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Venue;
