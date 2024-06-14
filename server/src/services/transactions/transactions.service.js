const db = require("../../configs/mongodb.config").getDatabase();
const { ObjectId } = require("mongodb");
const transactionsCollection = db.collection("transactions");

const addTransaction = async (transaction) => {
  const result = await transactionsCollection.insertOne(transaction);

  // If the portfolio was added successfully, return the portfolio
  if (!result.insertedCount === 1) {
    throw new Error("Failed to add portfolio");
  }

  const insertedTransaction = await transactionsCollection.findOne({ _id: result.insertedId });
  return insertedTransaction;
};

const getTransactions = async (portfolioId, coinId) => {
  const transactions = await transactionsCollection
    .find({ portfolioId: portfolioId, coinId: coinId })
    .toArray();
  return transactions;
};

module.exports = {
  addTransaction,
  getTransactions,
};
