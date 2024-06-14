const { MongoClient } = require("mongodb");
const { MONGODB_URI } = require("./env.config");

const client = new MongoClient(MONGODB_URI);


const connectToDatabase = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
};

const getDatabase = () => {
  return client.db("PortfolioManager");
};

module.exports = {
  connectToDatabase,
  getDatabase,
};
