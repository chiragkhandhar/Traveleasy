import React from "react";
import { Fragment } from "react";

import "../Styles/SavedVenue.css";

// Icons
import { VscGroupByRefType } from "react-icons/vsc";
import axios from "axios";

function SavedVenue(props) {
  const place = props.place;
  const token = localStorage.getItem('token');
  const handleRemove = () => {
    const place_id = place.id;
    const URI = '/api/deleteplace/'
    axios.post(URI,place_id,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
     props.api_getUserProfile();
    })
    .catch(err=>{
     alert(err);
    })
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
