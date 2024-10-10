const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = require("../config/config");

const authMiddleware = async (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(400).json({});
  // }
  // const token = authHeader.split(" ")[1];

  const cookies = req.cookies;
  const { token } = cookies;
  const decoded = jwt.decode(token);
  console.log(decoded);

  if (!token) {
    return res.status(401).send("Please Login to the account");
  }

  try {
    const decoded = await jwt.verify(token, JWT_SECRET_TOKEN);
    // console.log(decoded);

    if (decoded._id) {
      req.userId = decoded._id;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Token verification failed" });
  }
};

module.exports = authMiddleware;
