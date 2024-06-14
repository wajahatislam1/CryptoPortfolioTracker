const { checkSchema, checkExact } = require("express-validator");

const validateAddTransaction = checkExact(
  checkSchema({
    portfolioId: {
      notEmpty: {
        errorMessage: "PortfolioId is required",
      },
      isString: {
        errorMessage: "PortfolioId must be a string",
      },
    },

    coinId: {
      notEmpty: {
        errorMessage: "CoinId is required",
      },
      isString: {
        errorMessage: "CoinId must be a string",
      },
    },

    type: {
      notEmpty: {
        errorMessage: "Type is required",
      },
      isString: {
        errorMessage: "Type must be a string",
      },
    },

    date: {
      notEmpty: {
        errorMessage: "Date is required",
      },
      custom: {
        options: (value) => {
          const date = new Date(value);
          return !isNaN(date.getTime());
        },
        errorMessage: "Date must be a date",
      },
    },

    amountOfCoins: {
      notEmpty: {
        errorMessage: "AmountOfCoins is required",
      },
      isNumeric: {
        errorMessage: "AmountOfCoins must be a number",
      },
    },

    pricePerCoin: {
      notEmpty: {
        errorMessage: "PricePerCoin is required",
      },
      isNumeric: {
        errorMessage: "PricePerCoin must be a number",
      },
    },
  })
);

const validateGetTransactions = checkExact(
  checkSchema({
    portfolioId: {
      notEmpty: {
        errorMessage: "portfolioId is required",
      },
      isString: {
        errorMessage: "portfolioId must be a string",
      },
    },

    coinId: {
      notEmpty: {
        errorMessage: "coinId is required",
      },
      isString: {
        errorMessage: "coinId must be a string",
      },
    },
  })
);

module.exports = { validateAddTransaction, validateGetTransactions };
