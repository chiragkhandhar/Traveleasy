import React, { Fragment, useState } from "react";
import "../Styles/Searchbox.css";

function Searchbox() {
  const [state, setstate] = useState({
    searchText: "",
  });

  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const handleSearch = () => {
    console.log("Call Api here");
    console.log(state);
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
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </Fragment>
  );
}

export default Searchbox;
