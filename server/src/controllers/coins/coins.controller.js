const coinsService = require("../../services/coins/coins.service");

const getCoinsList = async (req, res) => {
  try {
    const coins = await coinsService.getCoinsList();
    res.status(200).json({ coins });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCoinsList,
};
