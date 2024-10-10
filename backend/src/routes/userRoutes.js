const express = require("express");
const User = require("../models/user");
const zod = require("zod");
const JWT_SECRET_TOKEN = require("../config/config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

const signupSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const updateSchema = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
      return res
        .json({ message: "Invalid email address / invalid input" })
        .status(400);
    }
    const { firstName, lastName, userName, password } = req.body;

    const isUserPresent = await User.findOne({ userName: userName });

    if (isUserPresent) {
      return res
        .json({ message: "Invalid email address / invalid input" })
        .status(400);
    }

    const user = new User({ firstName, lastName, userName, password });
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        userId: savedUser._id,
      },
      JWT_SECRET_TOKEN
    );

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

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET_TOKEN
    );
    return res.json({
      message: user,
      token: token,
    });
  }

  res.status(400).json({
    message: "Error while signing in",
  });
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid input given" });
  }

  try {
    console.log("User ID:", req.userId); // Log the user ID to verify it
    console.log("Request Body:", req.body);
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

module.exports = userRouter;
