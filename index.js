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
  getSimilarVenueDetailsByID
} = require("./routes/places");
const { signup, login } = require("./routes/users");


//Connection
app.get("/", sayHello);
app.get("/api/places/:ll", getPlacesByLatLong);
app.get("/api/places/:near", getPlacesByLocationName);
app.get("/api/places/:near/:query", getPlacesByNameCategory);
app.get("/api/places/:ll/:query", getPlacesByLatLongCategory);
app.get("/api/venue/:id", [verifyToken], getVenueDetailsByID);
app.get("/api/venue/similar/:id", [verifyToken], getSimilarVenueDetailsByID);

//Users
app.post("/api/user/signup", signup);
app.post("/api/user/login", login);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
