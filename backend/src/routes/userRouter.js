const express = require("express");
const User = require("../models/user");
const zod = require("zod");
const JWT_SECRET_TOKEN = require("../config/config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Account = require("../models/account");
const userRouter = express.Router();

const user_safe_data = "firstName lastName userName";

const signupSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "invalid input" });
    }
    const { firstName, lastName, userName, password } = req.body;

    const isUserPresent = await User.findOne({ userName: userName });

    if (isUserPresent) {
      return res
        .status(400)
        .json({ message: "Invalid email address / invalid input" });
    }

    const user = new User({ firstName, lastName, userName, password });
    const savedUser = await user.save();
    const userId = savedUser._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    // const token = jwt.sign(
    //   {
    //     userId: savedUser._id,
    //   },
    //   JWT_SECRET_TOKEN
    // );

    res.status(200).json({
      message: "User data saved successfully",
      data: savedUser,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid user credentials",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  const token = await user.getJWT();

  if (user) {
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    return res.json({
      data: user,
      token: token,
    });
  }

  return res.status(400).json({
    message: "Error while signing in",
  });
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid input given" });
  }

  try {
    // console.log("User ID:", req.userId); // Log the user ID to verify it
    // console.log("Request Body:", req.body);
    const user = await User.findOneAndUpdate({ _id: req.userId }, req.body, {
      new: true,
    });

    return res.json({
      message: ` your profile updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ error: "ERROR: " + err.message });
  }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const regexFilter = new RegExp(filter, "i");
  const users = await User.find({
    $or: [
      { firstName: { $regex: regexFilter } },
      { lastName: { $regex: regexFilter } },
    ],
  });
  res.json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      _id: user._id,
    })),
  });
});

userRouter.get("/user", authMiddleware, async (req, res) => {
  try {
    const loggeddInUserId = req.userId;

    const user = await User.findById(loggeddInUserId).select(user_safe_data);

    if (user) {
      return res.json({
        data: user,
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = userRouter;
