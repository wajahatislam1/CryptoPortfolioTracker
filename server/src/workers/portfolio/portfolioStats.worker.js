const workerpool = require("workerpool");
const coinsService = require("../../services/coins/coins.service");

const calculateCoinStats = (coinMarketData, coinTransactions) => {
  const stats = {
    totalPositionCost: 0,
    totalPositionValue: 0,
    amountOfCoins: 0,
    realizedPNL: 0,
    realizedPNLPercentage: 0,
    unrealizedPNL: 0,
    unrealizedPNLPercentage: 0,
    positionAveragePrice: 0,
    currentPrice: coinMarketData.priceUsd,
  };

  for (const transaction of coinTransactions) {
    if (transaction.type === "sell") {
      //Will only work if transactions are in order of date.
      stats.realizedPNL +=
        transaction.amountOfCoins * (transaction.pricePerCoin - stats.positionAveragePrice);
      stats.realizedPNLPercentage = (stats.realizedPNL / stats.totalPositionCost) * 100;

      stats.totalPositionCost -= transaction.amountOfCoins * stats.positionAveragePrice;
      stats.amountOfCoins -= transaction.amountOfCoins;
    } else if (transaction.type === "buy") {
      stats.totalPositionCost += transaction.amountOfCoins * transaction.pricePerCoin;
      stats.amountOfCoins += transaction.amountOfCoins;
      stats.positionAveragePrice = stats.totalPositionCost / stats.amountOfCoins;
    }
  }

  stats.totalPositionValue = stats.amountOfCoins * coinMarketData.priceUsd;
  stats.unrealizedPNL = stats.totalPositionValue - stats.totalPositionCost;
  stats.unrealizedPNLPercentage = (stats.unrealizedPNL / stats.totalPositionValue) * 100;

  return stats;
};

const calculatePortfolioCoinsStats = async (portfolioTransactions) => {
  const coinIds = portfolioTransactions.map((coin) => coin._id);
  const coinsMarketData = await coinsService.getCoinsMarketData(coinIds);
  //Create a map of coinId to coinMarketData
  const coinMarketDataMap = coinsMarketData.reduce((acc, coin) => {
    acc[coin._id] = coin;
    return acc;
  }, {});

  stats = [];
  for (let i = 0; i < portfolioTransactions.length; i++) {
    const coinTransactions = portfolioTransactions[i].transactions;
    const coinMarketData = coinMarketDataMap[portfolioTransactions[i]._id];
    const coinStats = await calculateCoinStats(coinMarketData, coinTransactions);
    stats.push({
      coinId: portfolioTransactions[i]._id,
      coinStats: coinStats,
    });
  }
  return stats;
};

workerpool.worker({
  calculatePortfolioCoinsStats: calculatePortfolioCoinsStats,
});
