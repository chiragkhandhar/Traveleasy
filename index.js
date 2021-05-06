const {app,port} = require("./utils/admin")
const {getPlacesByLatLong,sayHello,getPlacesByLocationName, getPlacesByNameCategory} = require("./routes/places")
//Connection
app.get("/",sayHello);
app.post("/api/places/ll",getPlacesByLatLong);
app.post("/api/places/near",getPlacesByLocationName);
app.get("/api/places/:near/:query",getPlacesByNameCategory);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });