import React from "react";
import { Fragment } from "react";

import "../Styles/SavedVenue.css";

// Icons
import { VscGroupByRefType } from "react-icons/vsc";

function SavedVenue(props) {
  const place = props.place;

  const handleRemove = () => {
    const place_id = place.id;
    //API Call here; On Success call props.api_getUserProfile
  };
  return (
    <Fragment>
      <div className="sv-container">
        <div className="sv-details">
          <p className="venue-name">{place.name}</p>
          <div className="venue-category">
            <VscGroupByRefType />
            <p className="venue-categoryname">
              {place.categories[0].shortName}
            </p>
          </div>
        </div>

        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </Fragment>
  );
}

export default SavedVenue;
