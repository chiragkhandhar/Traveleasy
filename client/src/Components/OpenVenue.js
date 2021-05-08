import React, { Fragment } from "react";

import "../Styles/OpenVenue.css";

// Components
import ChartContainer from "../Components/ChartContainer";

// MUI Stuff
import IconButton from "@material-ui/core/IconButton";

// Icons
import { CgClose } from "react-icons/cg";
import {
  HiOutlineLocationMarker,
  HiPhone,
  HiExternalLink,
  HiStar,
  HiStatusOnline,
} from "react-icons/hi";
import { VscGroupByRefType, VscVerified } from "react-icons/vsc";

function OpenVenue(props) {
  const venue = props.openVenue;

  const handleCloseClick = () => {
    props.setVenueView(false, {});
  };
  return (
    <Fragment>
      <div className="ov-container">
        <div className="close-btn">
          <IconButton onClick={handleCloseClick}>
            <CgClose />
          </IconButton>
        </div>

        <div className="details">
          {venue.traveleasy_photo && (
            <img
              className="ov-img"
              src={venue.traveleasy_photo}
              alt="banner image"
            />
          )}
          <div className="ov-name-wrapper">
            <p className="ov-venue-name">{venue.name}</p>
            {venue.verified && (
              <VscVerified style={{ fontSize: "2rem", marginLeft: "1rem" }} />
            )}
          </div>

          {venue.description && (
            <p className="ov-description">{venue.description}</p>
          )}

          {venue.defaultHours && (
            <div className="venue-category">
              <HiStatusOnline />
              <p className="venue-categoryname">{venue.defaultHours.status}</p>
            </div>
          )}

          {venue.rating && (
            <div className="venue-category">
              <HiStar />
              <p className="venue-categoryname">{venue.rating}</p>
            </div>
          )}

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
          {venue.contact.formattedPhone && (
            <div className="venue-category">
              <HiPhone />
              <p className="venue-categoryname">
                {venue.contact.formattedPhone}
              </p>
            </div>
          )}

          {venue.url && (
            <div className="venue-category">
              <HiExternalLink />
              <a
                href={venue.url}
                target="_blank"
                className="venue-categoryname"
              >
                {venue.url}
              </a>
            </div>
          )}

          <div className="chart-holder">
            <ChartContainer />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OpenVenue;
