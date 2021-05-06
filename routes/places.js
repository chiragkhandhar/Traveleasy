const { response } = require("express");
const { client_id, client_secret } = require("./api.config");
const axios = require("axios")

exports.getPlacesByLatLong = (request, response) => {
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  URL = `https://api.foursquare.com/v2/venues/search?ll=${latitude},${longitude}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data)
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location"+ err });
    });
};

exports.getPlacesByLocationName= (request, response) => {
  const near = request.body.near;
  URL = `https://api.foursquare.com/v2/venues/search?near=${near}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data)
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location"+ err });
    });
};

exports.getPlacesByNameCategory= (request, response) => {
  const near = request.params.near;
  const query = request.params.query;
  console.log(near,query);
  URL = `https://api.foursquare.com/v2/venues/search?near=${near}&query=${query}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data)
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location"+ err });
    });
};
exports.sayHello = (request, response) => {
  response.status(200).json({"message":"hello world"})
  };