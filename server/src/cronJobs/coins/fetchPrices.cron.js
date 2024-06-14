const coinService = require("../../services/coins/coins.service");
const portfolioService = require("../../services/portfolio/portfolio.service");
const cron = require("node-cron");
const { COINCAP_API_KEY } = require("../../configs/env.config");

const fetchPrices = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Fetching coin prices through cron job!");

    //Get all the coins users are trackings.
    const uniqueTrackedCoins = await portfolioService.getUniqueCoinsInPortfolios();

    //Change the above array to an object with symbol as key
    const trackedCoins = uniqueTrackedCoins.reduce((acc, coin) => {
      acc[coin.symbol] = coin;
      return acc;
    }, {});

    let updatedCoinData = {};

    for (let offset = 0; offset <= 4000; offset += 2000) {
      let FETCH_URL = "https://api.coincap.io/v2/assets?limit=2000";
      if (offset > 0) {
        FETCH_URL = `${FETCH_URL}&offset=${offset}`;
      }

      //Fetch all crypto assets from coincap
      const response = await fetch(FETCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${COINCAP_API_KEY}`,
        },
      });

      if (response.status !== 200) {
        const data = await response.json();
        console.log("Error fetching coins", data);
        return;
      }

      const data = await response.json();

      for (const coin of data.data) {
        const trackedCoin = trackedCoins[coin.symbol];

        if (
          trackedCoin &&
          !updatedCoinData[trackedCoin._id] &&
          (trackedCoin.name === coin.name || trackedCoin.slug === coin.id)
        ) {
          updatedCoinData[trackedCoin._id] = {
            id: trackedCoin._id,
            rank: coin.rank,
            marketCap: coin.marketCapUsd,
            priceUsd: coin.priceUsd,
            changePercent24Hr: coin.changePercent24Hr,
          };
        }
      }
    }

    //Convert coins data object to a list
    updatedCoinData = Object.values(updatedCoinData);

    //Update the coin market data in the database
    const result = await coinService.updateCoinMarketData(updatedCoinData);
    console.log("Coins updated in db", result);
  });
};

module.exports = { fetchPrices };
