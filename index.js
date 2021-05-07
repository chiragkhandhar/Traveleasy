const {app,port} = require("./utils/admin")
const {getPlacesByLatLong,sayHello,getPlacesByLocationName, getPlacesByNameCategory,getPlacesByLatLongCategory} = require("./routes/places")
//Connection
app.get("/",sayHello);
app.get("/api/places/:ll",getPlacesByLatLong);
app.get("/api/places/:near",getPlacesByLocationName);
app.get("/api/places/:near/:query",getPlacesByNameCategory);
app.get("/api/places/:ll/:query",getPlacesByLatLongCategory);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });