const express = require("express");
const router = express.Router();

const userRouter = require("./user/user.routes");
const checkRouter = require("./checks/checks.routes");
const portfolioRouter = require("./portfolio/portfolio.routes");
const coinsRouter = require("./coins/coins.routes");
const transactionsRouter = require("./transactions/transactions.routes");

router.use("/users", userRouter);
router.use("/checks", checkRouter);
router.use("/portfolio", portfolioRouter);
router.use("/coins", coinsRouter);
router.use("/transactions", transactionsRouter);

module.exports = router;
