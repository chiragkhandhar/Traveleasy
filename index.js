const {app,port} = require("./backend/utils/admin")

//Connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });