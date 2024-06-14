const express = require("express");
const router = express.Router();
const passport = require("passport");
const portfolioController = require("../../controllers/portfolio/portfolio.controller");
const portfolioValidator = require("../../validators/portfolio/portfolio.validator");
const portfolioMiddleware = require("../../middlewares/portfolio/portfolio.middleware");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.post(
  "/",
  authMiddleware.authenticateJWT,
  portfolioValidator.addPortfolioValidator,
  portfolioController.addPortfolio
);

router.get(
  "/",
  authMiddleware.authenticateJWT,
  portfolioController.getPortfolioList
);

router.put(
  "/:id",
  authMiddleware.authenticateJWT,
  portfolioValidator.updatePortfolioValidator,
  portfolioController.updatePortfolio
);

router.delete(
  "/:id",
  authMiddleware.authenticateJWT,
  portfolioController.deletePortfolio
);

router.post(
  "/:id/coins",
  authMiddleware.authenticateJWT,
  portfolioValidator.addCoinToPortfolioValidator,
  portfolioMiddleware.isCoinUnique,
  portfolioController.addCoinToPortfolio
);

router.delete(
  "/:portfolioId/coins/:coinId",
  authMiddleware.authenticateJWT,
  portfolioMiddleware.isUserOwnerOfCoin,
  portfolioController.deleteCoinFromPortfolio
);

router.get(
  "/coins/stats/:portfolioId",
  authMiddleware.authenticateJWT,
  portfolioMiddleware.isUserOwnerOfPortfolio,
  portfolioController.getPortfolioCoinsStats
);
module.exports = router;
