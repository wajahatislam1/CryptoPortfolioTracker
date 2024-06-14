const path = require("path");
const db = require("../../configs/mongodb.config").getDatabase();
const { ObjectId } = require("mongodb");
const portfolioCollection = db.collection("portfolios");
const transactionCollection = db.collection("transactions");
const workerpool = require("workerpool");

const pool = workerpool.pool(
  path.join(__dirname, "../../workers/portfolio/portfolioStats.worker.js")
);

const addPortfolio = async (portfolio) => {
  const result = await portfolioCollection.insertOne(portfolio);

  // If the portfolio was added successfully, return the portfolio
  if (!result.insertedCount === 1) {
    throw new Error("Failed to add portfolio");
  }

  const insertedPortfolio = await portfolioCollection.findOne({ _id: result.insertedId });
  return insertedPortfolio;
};

const updatePortfolio = async (id, portfolio) => {
  const result = await portfolioCollection.updateOne(
    { _id: new ObjectId(String(id)) },
    { $set: portfolio }
  );

  // If the portfolio was updated successfully, return the updated portfolio
  if (!result.modifiedCount === 1) {
    throw new Error("Failed to update portfolio");
  }

  const updatedPortfolio = await portfolioCollection.findOne({ _id: new ObjectId(String(id)) });
  return updatedPortfolio;
};

const deletePortfolio = async (portfolioId) => {
  const result = await portfolioCollection.deleteOne({ _id: new ObjectId(String(portfolioId)) });

  if (result.deletedCount === 0) {
    throw new Error("Failed to delete portfolio");
  }
};

const getPortfolioList = async (userId) => {
  const portfolios = await portfolioCollection.find({ userId: userId }).toArray();
  return portfolios;
};

const addCoinToPortfolio = async (portfolioId, coin) => {
  const result = await portfolioCollection.updateOne(
    { _id: new ObjectId(String(portfolioId)) },
    { $push: { coins: coin } }
  );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to add coin to portfolio");
  }

  const updatedPortfolio = await portfolioCollection.findOne({
    _id: new ObjectId(String(portfolioId)),
  });
  return updatedPortfolio;
};

const isCoinUnique = async (portfolioId, coinslug) => {
  const coin = await portfolioCollection.findOne({
    _id: new ObjectId(String(portfolioId)),
    "coins.slug": coinslug,
  });

  return !coin;
};

const isUserOwnerOfCoin = async (userId, portfolioId, coinId) => {
  const coin = await portfolioCollection.findOne({
    _id: new ObjectId(String(portfolioId)),
    userId: userId,
    "coins._id": coinId,
  });

  return coin !== null;
};

const isUserOwnerOfPortfolio = async (userId, portfolioId) => {
  const portfolio = await portfolioCollection.findOne({
    _id: new ObjectId(String(portfolioId)),
    userId: userId,
  });

  return portfolio !== null;
};

const deleteCoinFromPortfolio = async (portfolioId, coinId) => {
  //Delete transaction associated with this coin
  await transactionCollection.deleteMany({ portfolioId: portfolioId, coinId: coinId });

  const result = await portfolioCollection.updateOne(
    { _id: new ObjectId(String(portfolioId)) },
    { $pull: { coins: { _id: coinId } } }
  );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to delete coin from portfolio");
  }

  const updatedPortfolio = await portfolioCollection.findOne({
    _id: new ObjectId(String(portfolioId)),
  });
  return updatedPortfolio;
};

const getUniqueCoinsInPortfolios = async () => {
  //Fetch all the unqiues coins from all portfolios

  const uniqueCoinsInPortfolios = portfolioCollection
    .aggregate([
      { $unwind: "$coins" },
      {
        $group: {
          _id: "$coins._id",
          name: { $first: "$coins.name" },
          symbol: { $first: "$coins.symbol" },
          slug: { $first: "$coins.slug" },
          logo: { $first: "$coins.logo" },
          url: { $first: "$coins.url" },
        },
      },
    ])
    .toArray();

  return uniqueCoinsInPortfolios;
};

const getPortfolioCoinsStats = async (portfolioId) => {
  const portfolioTransactions = await transactionCollection
    .aggregate([
      { $match: { portfolioId: portfolioId } }, // Filter transactions by portfolioId
      { $sort: { date: 1 } }, // Sort transactions by date in ascending order
      {
        $group: {
          _id: "$coinId", // Group by coinId
          transactions: {
            $push: "$$ROOT", // Collect transaction documents
          },
        },
      },
      { $sort: { date: 1 } }, // Optional: Sort groups by coinId in ascending order
    ])
    .toArray();

  const coinStats = await pool.exec("calculatePortfolioCoinsStats", [portfolioTransactions]);
  return coinStats;
};

module.exports = {
  addPortfolio,
  updatePortfolio,
  getPortfolioList,
  deletePortfolio,
  addCoinToPortfolio,
  isCoinUnique,
  isUserOwnerOfCoin,
  deleteCoinFromPortfolio,
  getUniqueCoinsInPortfolios,
  isUserOwnerOfPortfolio,
  getPortfolioCoinsStats,
};
