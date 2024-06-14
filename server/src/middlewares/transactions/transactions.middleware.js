const portfolioService = require("../../services/portfolio/portfolio.service");
const { validationResult } = require("express-validator");

const isUserOwnerOfCoin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }

  const userId = req.user._id;
  const { portfolioId, coinId } = req.body;
  const isOwner = await portfolioService.isUserOwnerOfCoin(userId, portfolioId, coinId);

  if (!isOwner) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = {
  isUserOwnerOfCoin,
};
