import React, { Fragment, useState } from "react";
import axios from "axios";

import "../Styles/Searchbox.css";

function Searchbox(props) {
  const [state, setstate] = useState({
    searchText: "",
    queryText: "",
  });

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleSearch = () => {
    console.log("Calling API...");
    api_LocationQuery();
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

  return (
    <Fragment>
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
          placeholder="Search query..."
        ></input>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </Fragment>
  );
}

export default Searchbox;
