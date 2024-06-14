const { symbol, options } = require("joi");

const db = require("../../configs/mongodb.config").getDatabase();
const coinsCollection = db.collection("coins");
const coinMarketDataCollection = db.collection("coinMarketData");

const addCoins = async (coins) => {
  coinsCollection.createIndex({ slug: 1 }, { unique: true });
  try {
    const result = await coinsCollection.insertMany(coins, { ordered: false });
    return result.insertedCount;
  } catch (error) {
    return 0;
  }
};

const getCoins = async () => {
  const coins = await coinsCollection.find({}).toArray();
  return coins;
};

const getCoin = async (coinSlug) => {
  const coin = await coinsCollection.findOne({ slug: coinSlug });
  return coin;
};

const getCoinsList = async () => {
  const coins = await coinsCollection.find({}).toArray();
  return coins;
};
const updateCoinMarketData = async (coinsData) => {
  try {
    const bulkOps = coinsData.map((coin) => ({
      updateOne: {
        filter: { _id: coin.id },
        update: {
          $set: {
            rank: coin.rank,
            marketCap: coin.marketCap,
            priceUsd: coin.priceUsd,
            changePercent24Hr: coin.changePercent24Hr,
          },
        },
        upsert: true,
      },
    }));

    const result = await coinMarketDataCollection.bulkWrite(bulkOps);
    return result.modifiedCount; // use modifiedCount directly
  } catch (error) {
    console.log("Error updating coin market data", error);
  }
};

const getCoinsMarketData = async (coinsIdsList) => {
  const coins = await coinMarketDataCollection.find({ _id: { $in: coinsIdsList } }).toArray();
  return coins;
};

module.exports = { addCoins, getCoins, getCoin, getCoinsList, updateCoinMarketData, getCoinsMarketData };
