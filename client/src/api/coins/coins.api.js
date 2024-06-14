import { FETCHCOINLIST_URL } from "../urls/api.urls";

const fetchCoinList = async (jwtToken) => {
  const response = await fetch(`${FETCHCOINLIST_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
};

export { fetchCoinList };
