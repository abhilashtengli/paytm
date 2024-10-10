const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = require("../config/config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, JWT_SECRET_TOKEN, {
    expiresIn: "8h",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
