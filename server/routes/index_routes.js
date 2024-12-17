const express = require("express");
const router = express.Router();
const userRouter = require("./user_routes");
const accountRouter = require("./account_routes");

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
