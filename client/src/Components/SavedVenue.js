import React from "react";
import { Fragment } from "react";

import "../Styles/SavedVenue.css";

// Icons
import { VscGroupByRefType } from "react-icons/vsc";

function SavedVenue() {
  return (
    <Fragment>
      <div className="sv-container">
        <div className="sv-details">
          <p className="venue-name">Lake Meadows</p>
          <div className="venue-category">
            <VscGroupByRefType />
            <p className="venue-categoryname">
              Residential
            </p>
          </div>
        </div>

        <button className="remove-btn">Remove</button>
      </div>
    </Fragment>
  );
}

export default SavedVenue;
