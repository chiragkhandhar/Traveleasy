const { app, port } = require("./utils/admin");
const apiConfig = require("./routes/api.config");
const { verifyToken } = require("./middleware/authJWT");
const {
  getPlacesByLatLong,
  sayHello,
  getPlacesByLocationName,
  getPlacesByNameCategory,
  getPlacesByLatLongCategory,
  getVenueDetailsByID,
  getSimilarVenueDetailsByID,
  savePlaces,
  deletePlace
} = require("./routes/places");
const { signup, login,getUserProfile } = require("./routes/users");


//Connection
app.get("/", sayHello);
app.get("/api/places/:ll", getPlacesByLatLong);
app.get("/api/places/:near", getPlacesByLocationName);
app.get("/api/places/:near/:query", getPlacesByNameCategory);
app.get("/api/venue/:id", [verifyToken], getVenueDetailsByID);
app.get("/api/venue/similar/:id",getSimilarVenueDetailsByID);
app.get("/api/recommendations/:ll/",[verifyToken],getPlacesByLatLongCategory);
app.post("/api/saveplace/",[verifyToken],savePlaces);
app.post("/api/deleteplace/",[verifyToken],deletePlace);
//Users
app.post("/api/user/signup", signup);
app.post("/api/user/login", login);
app.get("/api/user/profile", [verifyToken],getUserProfile);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
