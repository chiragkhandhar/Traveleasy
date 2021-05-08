const { response } = require("express");
const { client_id, client_secret } = require("./api.config");
const axios = require("axios");
const User = require("../models/user.model");
const { query } = require("express");

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

function getMax(arr, prop) {
  var max;
  for (var i=0 ; i<arr.length ; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
  }
  return max;
}

exports.getPlacesByLatLongCategory = (request, response) => {
  const ll = request.params.ll;
  let query = '';
  const user_id = request.user_id;
  console.log(user_id)
  URL = `https://api.foursquare.com/v2/venues/search?near=${ll}&categoryId=4d4b7105d754a06374d81259&query=${query}&limit=50&client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  User.findOne({_id:user_id})
  .then(user=>{
    if(user.browsedcategories.length>0){
      const browsedcategories = user.browsedcategories;
      if(browsedcategories.length==1){
        query = browsedcategories[0].category;
        axios
        .get(URL)
        .then((res) => {
          console.log(res.data);
          response.status(200).send(res.data);
        })
        .catch((err) => {
          response
            .status(400)
            .send({ error: "Cannot Fetch Places for this location" + err });
        });
      }
      else{
        let maxPpg = getMax(browsedcategories, "count");
        console.log(maxPpg);
        query = maxPpg.category;
        axios
        .get(URL)
        .then((res) => {
          console.log(res.data);
          response.status(200).send(res.data);
        })
        .catch((err) => {
          response
            .status(400)
            .send({ error: "Cannot Fetch Places for this location" + err });
        });
      }
    }
    else{
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
    }
  })
};

exports.getVenueDetailsByID = (request, response) => {
  const VENUE_ID = request.params.id;
  const user_id = request.user_id;
  console.log("User_ID" + user_id);
  const URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}?client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  const PHOTO_URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}/photos?client_id=${client_id}&client_secret=${client_secret}&v=20210504`
  axios.get(URL).then((res) => {
    const data = res.data;
    const category = res.data.response.venue.categories[0].shortName;
    console.log(category);
    if (!request.user_id) {
      axios.get(PHOTO_URL)
        .then(photo_res=>{
          const photo_data = photo_res.data;
          console.log(photo_data.response);
          if(photo_data.response.photos.items.length!=0){
            const prefix = photo_data.response.photos.items[0].prefix
            const suffix = photo_data.response.photos.items[0].suffix
            const photoURL = prefix + '500x500' + suffix;
            data.response.venue.traveleasy_photo = photoURL;
          }
          response.status(200).json(data);
        })
        .catch(err=>{
          console.log(err);
          response.status(200).send({"error":"Unable to get data for this venue"});
        })
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
          axios.get(PHOTO_URL)
        .then(photo_res=>{
          const photo_data = photo_res.data;
          console.log(photo_data.response);
          if(photo_data.response.photos.items.length!=0){
            const prefix = photo_data.response.photos.items[0].prefix
            const suffix = photo_data.response.photos.items[0].suffix
            const photoURL = prefix + '500x500' + suffix;
            data.response.venue.traveleasy_photo = photoURL;
          }
          response.status(200).json(data);
        })
        .catch(err=>{
          console.log(err);
          response.status(200).send({"error":"Unable to get data for this venue"});
        })
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
            axios.get(PHOTO_URL)
        .then(photo_res=>{
          const photo_data = photo_res.data;
          console.log(photo_data.response);
          if(photo_data.response.photos.items.length!=0){
            const prefix = photo_data.response.photos.items[0].prefix
            const suffix = photo_data.response.photos.items[0].suffix
            const photoURL = prefix + '500x500' + suffix;
            data.response.venue.traveleasy_photo = photoURL;
          }
          response.status(200).json(data);
        })
        .catch(err=>{
          console.log(err);
          response.status(200).send({"error":"Unable to get data for this venue"});
        })
          })
          .catch((err) => {
            response.status(200).send({ error: "Request Cannot be completed" });
          });
      }
    });
  });
};


exports.getSimilarVenueDetailsByID = (request, response) => {
  const VENUE_ID = request.params.id;
  const user_id = request.user_id;
  console.log("User_ID" + user_id);
  const URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}/similar?client_id=${client_id}&client_secret=${client_secret}&v=20210504`;
  const PHOTO_URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}/photos?client_id=${client_id}&client_secret=${client_secret}&v=20210504`
  axios.get(URL)
  .then(res=>{
    response.status(200).json(res.data)
  })
  .catch(err=>{
    console.log(err);
    response.status(500).json(err)
  })
};

exports.sayHello = (request, response) => {
  response.status(200).json({ message: "hello world" });
};


exports.savePlaces = (request,response) => {
  const user_id = request.user_id;
  const place = request.body.place
  
  User.findOne({ _id: user_id }).then((user) => {
    console.log(user);
    const savedPlaces = user.savedPlaces;
    if (savedPlaces.length === 0) {
      savedPlaces.push(place)
      User.updateOne( { _id: user_id },
        {
          $set: {
            savedPlaces: savedPlaces,
          },
        })
        .then(res=>{
          response.status(200).json({"message":"Place Saved Successfully"})
        })
        .catch(err=>{
          response.status(400).json({"message":err})
        })
    }
    else{
      let place_exists = false;
      savedPlaces.forEach(existing_place => {
        if(existing_place.id===place.id){
          place_exists = true;
        }
        if(!place_exists){
          savedPlaces.push(place)
          User.updateOne( { _id: user_id },
            {
              $set: {
                savedPlaces: savedPlaces,
              },
            })
            .then(res=>{
              response.status(200).json({"message":"Place Saved Successfully"})
            })
            .catch(err=>{
              response.status(400).json({"message":err})
            })
        }
        else{
          response.status(400).json({"message":"Place Already Exists"})
        }
      });
    }
  })
}
exports.deletePlace = (request,response) => {
  const user_id = request.user_id;
  const id = request.body.id
  User.findOne({ _id: user_id }).then((user) => {
    const savedPlaces = user.savedPlaces;
    if (savedPlaces.length === 0) {
      savedPlaces.push(place)
    }
    else{
      let place_exists = false;
      savedPlaces.forEach(existing_place => {
        if(existing_place.id===place.id){
          place_exists = true;
        }
        if(!place_exists){
          savedPlaces.push(place)
          User.updateOne( { _id: user_id },
            {
              $set: {
                savedPlaces: savedPlaces,
              },
            })
            .then(res=>{
              response.status(200).json({"message":"Place Saved Successfully"})
            })
            .catch(err=>{
              response.status(400).json({"message":err})
            })
        }
        else{
          response.status(400).json({"message":"Place Already Exists"})
        }
      });
    }
  })
}