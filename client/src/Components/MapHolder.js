import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

import "../Styles/MapHolder.css";

function MapHolder() {
  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2hpcmFna2hhbmRoYXIiLCJhIjoiY2tvY2FiZjlyMGY1ajJvbzJreDhrNGx5aiJ9.Ouakv8PwMWQbljroZP7FCg";
    var map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/chiragkhandhar/ckocaj2v11wm517sc77iwo7fm/draft",
    });

    var marker = new mapboxgl.Marker().setLngLat([-87.615227, 41.835159]).addTo(map);
  };
  return <div id="map-container" className="base-map"></div>;
}

export default MapHolder;
