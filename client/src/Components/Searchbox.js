import React, { Fragment, useState } from "react";
import axios from "axios";

import "../Styles/Searchbox.css";

// MUI Stuff
import Chip from "@material-ui/core/Chip";

// Icons
import { MdSwapVerticalCircle } from "react-icons/md";

function Searchbox(props) {
  const [state, setstate] = useState({
    lat: props.lat,
    lon: props.lon,

    searchText: "",
    queryText: "",

    nearmeOn: true,
  });

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleSearch = () => {
    console.log("Calling API...");
    console.log(state);
    state.nearmeOn ? api_NearmeSearch() : api_LocationQuery();
  };

  const handleSearchToggle = () => {
    setstate({
      ...state,
      nearmeOn: !state.nearmeOn,
    });
  };

  const api_LocationQuery = () => {
    const URI = `/api/places/${state.searchText}/${state.queryText}`;
    axios
      .get(URI)
      .then((res) => {
        props.setVenues(res.data.response.venues);
        console.log(res.data.response.venues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api_NearmeSearch = () => {
    const URI = `/api/places/${state.lat},${state.lon}/${state.queryText}`;
    axios
      .get(URI)
      .then((res) => {
        props.setVenues(res.data.response.venues);
        console.log(res.data.response.venues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!state.nearmeOn ? (
        <div className="search-component">
          <input
            type="text"
            name="searchText"
            onChange={handleChange}
            className="search-box"
            placeholder="Search Location..."
          ></input>
          <input
            type="text"
            name="queryText"
            onChange={handleChange}
            className="query-box"
            placeholder="Search anything..."
          ></input>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      ) : (
        <div className="search-component">
          <input
            type="text"
            name="queryText"
            onChange={handleChange}
            className="query-box"
            placeholder="Search anything near you..."
          ></input>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}
      <Chip
        icon={<MdSwapVerticalCircle />}
        variant="outlined"
        label={state.nearmeOn ? "Search for Location" : "Search Near me"}
        onClick={handleSearchToggle}
        size="medium"
        style={{
          cursor: "pointer",
          fontSize: "16px",
          padding: "1rem",
          margin: "1rem",
        }}
      />
    </Fragment>
  );
}

export default Searchbox;
