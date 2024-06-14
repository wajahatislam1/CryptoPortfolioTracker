const coinService = require("../../services/coins/coins.service");
const cron = require("node-cron");
const { COINMARKETCAP_API_KEY } = require("../../configs/env.config");

const fetchCoins = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Fetching coins through cron job!");
    let coinsAdded = 0;
    for (let i = 2000; i <= 10000; i += 100) {
      //Fetch all crypto assets from coinmarket cap
      //Fetch all coins url
      //pass skipd_invalid as
      let FETCH_URL = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info";

      // create an array of ids from i to i+100
      let ids = Array.from({ length: 100 }, (_, index) => index + i).join(",");

      FETCH_URL = `${FETCH_URL}?id=${ids}&skip_invalid=true`;

      //FETCH COINs from this url and add to db using service
      const response = await fetch(FETCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
        },
      });

      if (response.status !== 200) {
        const data = await response.json();
        console.log("Error fetching coins", data.status.error_message);
        return;
      }

      const data = await response.json();
      const coins = [];
      for (const coinId in data.data) {
        const coin = data.data[coinId];
        const coinObj = {
          name: coin.name,
          symbol: coin.symbol,
          slug: coin.slug,
          logo: coin.logo,
          url: `https://coinmarketcap.com/currencies/${coin.slug}`,
        };

        coins.push(coinObj);
      }

      //Add coins to db
      const result = await coinService.addCoins(coins);
      console.log("Coins added to db", result);
      coinsAdded += result;
    }

    console.log("Coins added to db", coinsAdded);
  });
};

module.exports = { fetchCoins };
