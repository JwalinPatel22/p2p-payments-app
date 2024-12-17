const { Account } = require("../models.js");
const authenticateToken = require("../middleware.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const zod = require("zod");

//get balance
router.get("/balance", authenticateToken, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.json({ balance: account.balance });
});

router.post("/transfer", authenticateToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amt, recipient } = req.body;
  const sender = await Account.findOne({ userId: req.userId }).session(session);

  const validRecipient = await Account.findOne({ userId: recipient }).session(
    session
  );
  if (!validRecipient) {
    await session.abortTransaction();
    return res.json({ msg: "Recipient not found" });
  }

  if (!sender || amt > sender.balance) {
    await session.abortTransaction();
    return res.json({ msg: "Insufficient Balance" });
  }

  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amt } });
  await Account.updateOne({ userId: recipient }, { $inc: { balance: amt } });

  await session.commitTransaction();
  res.json({ msg: "Transaction Successful" });
});

module.exports = router;
