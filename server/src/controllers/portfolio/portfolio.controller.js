const portfolioService = require("../../services/portfolio/portfolio.service");
const { validationResult } = require("express-validator");

const addPortfolio = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const portfolio = req.body;

  try {
    portfolio.userId = req.user._id;
    const addedPortfolio = await portfolioService.addPortfolio(portfolio);
    res.status(201).json({ message: "Portfolio added successfully", portfolio: addedPortfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const portfolio = req.body;
  const id = req.params.id;

  try {
    const updatedPortfolio = await portfolioService.updatePortfolio(id, portfolio);
    res
      .status(200)
      .json({ message: "Portfolio updated successfully", portfolio: updatedPortfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPortfolioList = async (req, res) => {
  try {
    const portfolios = await portfolioService.getPortfolioList(req.user._id);
    res.status(200).json({ portfolios });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePortfolio = async (req, res) => {
  const portfolioId = req.params.id;
  try {
    const portfolios = await portfolioService.deletePortfolio(portfolioId);
    res.status(200).json({ portfolios });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addCoinToPortfolio = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const coin = req.body;
  const portfolioId = req.params.id;

  try {
    const updatedPortfolio = await portfolioService.addCoinToPortfolio(portfolioId, coin);
    res.status(200).json({ message: "Coin added to portfolio", portfolio: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCoinFromPortfolio = async (req, res) => {
  const { portfolioId, coinId } = req.params;
  try {
    const updatedPortfolio = await portfolioService.deleteCoinFromPortfolio(portfolioId, coinId);
    res.status(200).json({ message: "Coin deleted from portfolio", portfolio: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPortfolioCoinsStats = async (req, res) => {
  const portfolioId = req.params.portfolioId;
  try {
    const portfolioCoinsStats = await portfolioService.getPortfolioCoinsStats(portfolioId);
    res.status(200).json({portfolioId: portfolioId, coinsStats: portfolioCoinsStats} );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioList,
  addCoinToPortfolio,
  deleteCoinFromPortfolio,
  getPortfolioCoinsStats
};
