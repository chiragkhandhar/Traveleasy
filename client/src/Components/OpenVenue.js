import React from "react";
import { Fragment } from "react";
import "../Styles/OpenVenue.css";

// MUI Stuff
import IconButton from "@material-ui/core/IconButton";

// Icons
import { CgClose } from "react-icons/cg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";

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
          <p className="ov-venue-name">{venue.name}</p>
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
        </div>
      </div>
    </Fragment>
  );
}

export default OpenVenue;
