const express = require("express");
const router = express.Router();
const passport = require("passport");
const transactionsController = require("../../controllers/transactions/transactions.controller");

const transactionValidator = require("../../validators/transactions/transactions.validator");
const transactionsMiddleware = require("../../middlewares/transactions/transactions.middleware");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.post(
  "/",
  authMiddleware.authenticateJWT,
  transactionValidator.validateAddTransaction,
  transactionsMiddleware.isUserOwnerOfCoin,
  transactionsController.addTransaction
);

router.post(
  "/list",
  authMiddleware.authenticateJWT,
  transactionValidator.validateGetTransactions,
  transactionsMiddleware.isUserOwnerOfCoin,
  transactionsController.getTransactions
);

module.exports = router;
