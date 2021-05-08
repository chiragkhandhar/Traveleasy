import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

import "../Styles/MapHolder.css";

function MapHolder(props) {
  const venues = props.venues;
  let markers = [];
  let map;

  useEffect(() => {
    loadMap();

    removeMarkers();

    venues.forEach((venue) => {
      let temp = new mapboxgl.Marker({ color: "#333333" })
        .setLngLat([venue.location.lng, venue.location.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h2 style="font-family: 'Quicksand', sans-serif">${venue.name}</h2>`
          )
        );
      markers.push(temp);
    });
    addMarkers();
  }, [markers]);

  const addMarkers = () => {
    markers.forEach((marker) => {
      marker.addTo(map);
    });
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.remove();
    });
  };

  const loadMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2hpcmFna2hhbmRoYXIiLCJhIjoiY2tvY2FiZjlyMGY1ajJvbzJreDhrNGx5aiJ9.Ouakv8PwMWQbljroZP7FCg";
    map = new mapboxgl.Map({
      container: "map-container",
      center: venues[0]
        ? [venues[0].location.lng, venues[0].location.lat]
        : [-98.579, 39.828175],
      zoom: venues[0] ? 15 : 3,
      style: "mapbox://styles/chiragkhandhar/ckocaj2v11wm517sc77iwo7fm/draft",
    });
    map.addControl(new mapboxgl.NavigationControl());
  };
  return <div id="map-container" className="base-map"></div>;
}

export default MapHolder;
