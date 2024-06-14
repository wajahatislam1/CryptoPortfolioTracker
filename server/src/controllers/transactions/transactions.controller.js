const transactionService = require("../../services/transactions/transactions.service");

const addTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    const addedTransaction = await transactionService.addTransaction(transaction);
    res
      .status(201)
      .json({ message: "Transaction added successfully", transaction: addedTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  const { portfolioId, coinId } = req.body;

  try {
    const transactions = await transactionService.getTransactions(portfolioId, coinId);
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addTransaction,
  getTransactions,
};
