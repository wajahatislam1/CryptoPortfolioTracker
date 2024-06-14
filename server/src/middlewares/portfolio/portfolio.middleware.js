const portfolioService = require("../../services/portfolio/portfolio.service");

const isCoinUnique = async (req, res, next) => {
  const coin = req.body;
  const portfolioId = req.params.id;
  const isUnique = await portfolioService.isCoinUnique(portfolioId, coin.slug);

  if (!isUnique) {
    return res.status(400).json({ message: "Coin already exists in portfolio" });
  }
  next();
};

const isUserOwnerOfCoin = async (req, res, next) => {
  const userId = req.user._id;
  const {portfolioId, coinId} = req.params;
  const isOwner = await portfolioService.isUserOwnerOfCoin(userId, portfolioId, coinId);

  if (!isOwner) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const isUserOwnerOfPortfolio = async (req, res, next) => {
    const userId = req.user._id;
    const {portfolioId} = req.params;
    const isOwner = await portfolioService.isUserOwnerOfPortfolio(userId, portfolioId);

    if (!isOwner) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}

module.exports = {
  isCoinUnique,
  isUserOwnerOfCoin,
  isUserOwnerOfPortfolio
};
