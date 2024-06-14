const computeStats = (coinMarketData) => {
  coinTransactions = [
    {
      _id: "665da1ec5486e5b44a96e0640",
      portfolioId: "664f0c4334acdabc538489950",
      coinId: "6650947a16fc4b7977a658f40",
      type: "buy",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 100,
      pricePerCoin: 100,
    },

    {
      _id: "665da1ec5486e5b44a96e0641",
      portfolioId: "664f0c4334acdabc538489951",
      coinId: "6650947a16fc4b7977a658f41",
      type: "sell",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 100,
      pricePerCoin: 120,
    },

    {
      _id: "665da1ec5486e5b44a96e0642",
      portfolioId: "664f0c4334acdabc538489952",
      coinId: "6650947a16fc4b7977a658f42",
      type: "buy",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 100,
      pricePerCoin: 100,
    },

    {
      _id: "665da1ec5486e5b44a96e0643",
      portfolioId: "664f0c4334acdabc538489953",
      coinId: "6650947a16fc4b7977a658f43",
      type: "sell",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 100,
      pricePerCoin: 80,
    },

    {
      _id: "665da1ec5486e5b44a96e0644",
      portfolioId: "664f0c4334acdabc538489954",
      coinId: "6650947a16fc4b7977a658f44",
      type: "buy",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 100,
      pricePerCoin: 100,
    },

    {
      _id: "665da1ec5486e5b44a96e0645",
      portfolioId: "664f0c4334acdabc538489955",
      coinId: "6650947a16fc4b7977a658f45",
      type: "buy",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 80,
      pricePerCoin: 100,
    },

    {
      _id: "665da1ec5486e5b44a96e0646",
      portfolioId: "664f0c4334acdabc538489956",
      coinId: "6650947a16fc4b7977a658f46",
      type: "sell",
      date: "2024-06-03T10:58:00.000Z",
      amountOfCoins: 200,
      pricePerCoin: 100,
    },
  ];
  const coinTransactions = Array.from({ length: 20 }, (_, i) => ({
    _id: ("665da1ec5486e5b44a96e064" + i).toString(),
    portfolioId: ("664f0c4334acdabc53848995" + i).toString(),
    coinId: ("6650947a16fc4b7977a658f4" + i).toString(),
    type: i % 2 === 0 ? "buy" : "sell",
    date: "2024-06-03T10:58:00.000Z",
    amountOfCoins: 0.3 + i * 0.1,
    pricePerCoin: 0.3 + i * 0.05,
  }));

  const stats = {
    totalPositionCost: 0,
    totalPositionValue: 0,
    amountOfCoins: 0,
    realizedPNL: 0,
    realizedPNLPercentage: 0,
    unrealizedPNL: 0,
    unrealizedPNLPercentage: 0,
    positionAveragePrice: 0,
    currentPrice: 0,
  };

  for (const transaction of coinTransactions) {
    if (transaction.type === "sell") {
      stats.totalPositionCost -= transaction.amountOfCoins * transaction.pricePerCoin;
      stats.amountOfCoins -= transaction.amountOfCoins;

      //Will only change if user has sold coins.
      //Will only work if transactions are in order of date.
      stats.realizedPNL +=
        transaction.amountOfCoins * (transaction.pricePerCoin - stats.positionAveragePrice);
      stats.realizedPNLPercentage = stats.realizedPNL / stats.totalInvestmentValue;
    } else if (transaction.type === "buy") {
      stats.totalPositionCost += transaction.amountOfCoins * transaction.pricePerCoin;
      stats.amountOfCoins += transaction;
      stats.positionAveragePrice = stats.totalPositionCost / stats.amountOfCoins;
    }
  }

  stats.unrealizedPNL = stats.totalPositionCost - stats.totalInvestmentValue;
  stats.unrealizedPNLPercentage = stats.unrealizedPNL / stats.totalInvestmentValue;

  stats.totalPositionValue = stats.amountOfCoins * currentPrice;

  return stats;
};
