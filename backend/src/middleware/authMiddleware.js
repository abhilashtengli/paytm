const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = require("../config/config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_TOKEN);
    console.log(decoded.toString());

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Token verification failed" });
  }
};

module.exports = authMiddleware;
