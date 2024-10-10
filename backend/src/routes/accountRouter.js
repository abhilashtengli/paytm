const express = require("express");
const accountRouter = express.Router();
const mongoose = require("mongoose");
const Account = require("../models/account");
const zod = require("zod");
const authMiddleware = require("../middleware/authMiddleware");

accountRouter.get("/account/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });

    res.json({
      balance: account.balance,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

accountRouter.post("/account/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { amount, toUserId } = req.body;
    const fromUserId = req.userId;

    const account = await Account.findOne({ userId: fromUserId }).session(
      session
    );

    if (!account || amount > account.balance) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient balance to transfer" });
    }

    const toAccount = await Account.findOne({ userId: toUserId }).session(
      session
    );

    if (!toAccount) {
      session.abortTransaction();
      res.status(400).json({
        message: "Invalid Account",
      });
    }

    await Account.updateOne(
      {
        userId: fromUserId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: toUserId,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "transaction successfull",
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = accountRouter;
