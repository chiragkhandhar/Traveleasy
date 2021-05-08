const jwt = require("jsonwebtoken");
const config = require("../utils/auth.config");

exports.verifyToken = (request, response, next) => {
  console.log(request.headers.authorization);
  if (request.headers.authorization === undefined)
    return response.status(400).json({ error: "Authorization required" });

  if (request.headers.authorization === "Bearer null") {
    request.user_id = false;
    next();
  } else {
    let token = request.headers.authorization.split("Bearer ")[1];

    if (!token) {
      return response.status(403).json({ error: "No token provided" });
    }
    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return response.status(401).json({ error: "Unauthorized Request" });
      }
      request.user_id = decode.id;
      next();
    });
  }
};
