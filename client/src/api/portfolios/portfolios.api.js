import {
  ADD_PORTFOLIO_URL,
  UPDATE_PORTFOLIO_URL,
  DELETE_PORTFOLIO_URL,
  FETCH_PORTFOLIO_LIST_URL,
  GET_PORTFOLIO_COINS_STATS_URL,
} from "../urls/api.urls";

const addPortfolio = async (portfolio, jwtToken) => {
  const response = await fetch(ADD_PORTFOLIO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(portfolio),
  });
  return response;
};

const editPortfolio = async (portfolioId, portfolio, jwtToken) => {
  const response = await fetch(`${UPDATE_PORTFOLIO_URL}/${portfolioId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(portfolio),
  });

  return response;
};

const deletePortfolio = async (portfolioId, jwtToken) => {
  let response = await fetch(`${DELETE_PORTFOLIO_URL}/${portfolioId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
};

const fetchPortfolioList = async (jwtToken) => {
  const response = await fetch(FETCH_PORTFOLIO_LIST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
};

const addCoinToPortfolio = async (coin, portfolioId, jwtToken) => {
  const response = await fetch(`${UPDATE_PORTFOLIO_URL}/${portfolioId}/coins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(coin),
  });

  return response;
};

const deleteCoinFromPortfolio = async (portfolioId, coinId, jwtToken) => {
  console.log("coinId", coinId);
  const response = await fetch(`${UPDATE_PORTFOLIO_URL}/${portfolioId}/coins/${coinId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
};

const getPortfolioCoinsStats = async (portfolioId, jwtToken) => {
  const response = await fetch(`${GET_PORTFOLIO_COINS_STATS_URL}/${portfolioId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response;
};

export {
  addPortfolio,
  editPortfolio,
  deletePortfolio,
  fetchPortfolioList,
  addCoinToPortfolio,
  deleteCoinFromPortfolio,
  getPortfolioCoinsStats,
};
