const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.post("/adduser", async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    const user = new User({firstName, lastName, userName, password});
    const savedUser = await user.save();

    res
      .status(200)
      .json({ message: "User data saved successfully", data: savedUser });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = userRouter;
