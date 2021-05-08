const { response } = require("express");
const { client_id, client_secret } = require("./api.config");
const axios = require("axios");
const User = require("../models/user.model");

exports.getPlacesByLatLong = (request, response) => {
  const ll = request.params.ll;
  URL = `https://api.foursquare.com/v2/venues/search?ll=${ll}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data);
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location" + err });
    });
};

exports.getPlacesByLocationName = (request, response) => {
  const near = request.params.near;
  URL = `https://api.foursquare.com/v2/venues/search?near=${near}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data);
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location" + err });
    });
};

exports.getPlacesByNameCategory = (request, response) => {
  const near = request.params.near;
  const query = request.params.query;
  console.log(near, query);
  URL = `https://api.foursquare.com/v2/venues/search?near=${near}&query=${query}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data);
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location" + err });
    });
};

exports.getPlacesByLatLongCategory = (request, response) => {
  const ll = request.params.ll;
  const query = request.params.query;
  console.log(near, query);
  URL = `https://api.foursquare.com/v2/venues/search?ll=${ll}&query=${query}&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios
    .get(URL)
    .then((res) => {
      response.status(200).send(res.data);
    })
    .catch((err) => {
      response
        .status(400)
        .send({ error: "Cannot Fetch Places for this location" + err });
    });
};

exports.getVenueDetailsByID = (request, response) => {
  const VENUE_ID = request.params.id;
  const user_id = request.user_id;
  console.log("User_ID" + user_id);
  URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}?client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  axios.get(URL).then((res) => {
    const data = res.data;
    const category = res.data.response.venue.categories[0].shortName;
    console.log(category);
    if (!request.user_id) {
      response.status(200).json(data);
    }
    User.findOne({ _id: user_id }).then((user) => {
      const browsedcategories = user.browsedcategories;
      if (browsedcategories.length === 0) {
        console.log(category);
        browsedcategories.push({ category: category, count: 1 });
        User.updateOne(
          { _id: user_id },
          {
            $set: {
              browsedcategories: browsedcategories,
            },
          }
        ).then((res) => {
          response.status(200).json(data);
        });
      } else {
        let temp = browsedcategories.find((e) => e.category === category);
        if (temp) {
          temp.count += 1;
        } else {
          browsedcategories.push({ category: category, count: 1 });
        }
        User.updateOne(
          { _id: user_id },
          {
            $set: {
              browsedcategories: browsedcategories,
            },
          }
        )
          .then((res) => {
            response.status(200).json(data);
          })
          .catch((err) => {
            response.status(200).send({ error: "Request Cannot be completed" });
          });
      }
    });
  });
};

exports.sayHello = (request, response) => {
  response.status(200).json({ message: "hello world" });
};
