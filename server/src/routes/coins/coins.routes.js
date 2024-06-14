const express = require("express");
const router = express.Router();
const passport = require("passport");
const coinsController = require("../../controllers/coins/coins.controller");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.get("/", authMiddleware.authenticateJWT, coinsController.getCoinsList);
module.exports = router;
