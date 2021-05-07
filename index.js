const {app,port} = require("./utils/admin")
const {getPlacesByLatLong,sayHello,getPlacesByLocationName, getPlacesByNameCategory,getPlacesByLatLongCategory} = require("./routes/places");
const {signup,login} = require("./routes/users");
const apiConfig = require("./routes/api.config");
//Connection
app.get("/",sayHello);
app.get("/api/places/:ll",getPlacesByLatLong);
app.get("/api/places/:near",getPlacesByLocationName);
app.get("/api/places/:near/:query",getPlacesByNameCategory);
app.get("/api/places/:ll/:query",getPlacesByLatLongCategory);




//user
app.post("/api/user/signup",signup);
app.post("/api/user/login",login);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });