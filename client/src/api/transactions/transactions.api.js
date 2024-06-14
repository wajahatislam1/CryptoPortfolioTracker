import {
  ADD_TRANSACTION_URL,
  EDIT_TRANSACTION_URL,
  DELETE_TRANSACTION_URL,
  FETCH_TRANSACTION_LIST_URL,
} from "../urls/api.urls";

const addTransaction = (transactionInfo, jwtToken) => {
  return fetch(ADD_TRANSACTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(transactionInfo),
  });
};

const editTransaction = (transactionId, updatedTransaction, jwtToken) => {
  return fetch(`${EDIT_TRANSACTION_URL}/${transactionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(updatedTransaction),
  });
};

const deleteTransaction = (transactionId, jwtToken) => {
  return fetch(`${DELETE_TRANSACTION_URL}/${transactionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

const fetchTransactionList = (fetchTransactionListParams, jwtToken) => {
  return fetch(FETCH_TRANSACTION_LIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(fetchTransactionListParams),
  });
};

export { addTransaction, editTransaction, deleteTransaction, fetchTransactionList };
