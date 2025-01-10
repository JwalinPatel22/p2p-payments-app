const zod = require("zod");
const { User, Account } = require("../models.js");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware.js");

const express = require("express");
const router = express.Router();

//signup
const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "Incorrect Inputs" });
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(411).json({ msg: "Email already taken" });
  }

  const newUser = await User.create({
    username,
    password,
    firstName,
    lastName,
  });
  const userId = newUser._id;

  //creating an account and adding random balance to it
  await Account.create({
    userId,
    balance: Math.round(100 + Math.random() * 1000),
  });

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.set("Authorization", `Bearer ${token}`);
  res.json({
    msg: "New user created successfully",
    token: token,
  });
});

//signin
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "Invalid Input" });
  }

  try {
    const isUser = await User.findOne({
      username: username,
      password: password,
    });
    if (isUser) {
      const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
      res.set("Authorization", `Bearer ${token}`);
      res.json({ token: token });
    } else {
      return res.status(411).json({ msg: "User doesn't exist. Signup first" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Error signing in" });
  }
});

//Update credentials
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authenticateToken, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

//Get all users
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
