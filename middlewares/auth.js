const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);

    // Attach user information to the request object
    req.user = decodedToken;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = auth;
