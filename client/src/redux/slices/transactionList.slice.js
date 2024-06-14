import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as transactionApi from "../../api/transactions/transactions.api";

import { message } from "antd";

export const addTransaction = createAsyncThunk(
  "transactionlist/addtransaction",
  async (transactionInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;

      const response = await transactionApi.addTransaction(transactionInfo, jwtToken);
      if (response.ok) {
        return response.json();
      } else {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactionlist/edittransaction",
  async (transactionInfo, thunkAPI) => {
    const state = thunkAPI.getState();
    const jwtToken = state.user.jwtToken;

    const response = await transactionApi.editTransaction(
      transactionInfo.transactionId,
      transactionInfo.updatedTransaction,
      jwtToken
    );

    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      return thunkAPI.rejectWithValue({ error: "Unauthorized" });
    }
    return thunkAPI.rejectWithValue(await response.json());
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactionlist/deletetransaction",
  async (transactionId, thunkAPI) => {
    const state = thunkAPI.getState();
    const jwtToken = state.user.jwtToken;
    const response = await transactionApi.deleteTransaction(transactionId, jwtToken);
    if (response.ok) {
      return { transactionId, message: "Transaction deleted successfully" };
    } else if (response.status === 401) {
      return thunkAPI.rejectWithValue({ error: "Unauthorized" });
    }

    return thunkAPI.rejectWithValue(await response.json());
  }
);

export const fetchTransactionList = createAsyncThunk(
  "transactionlist/fetchTransactionlist",
  async (transactionsListParams, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;

      const response = await transactionApi.fetchTransactionList(transactionsListParams, jwtToken);
      if (response.ok) {
        return response.json();
      } else {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

const transactionListSlice = createSlice({
  name: "transactionlist",
  initialState: {
    transactionList: [],
    status: "idle",
  },
  reducers: {
    clearTransactionList: (state) => {
      state.transactionList = [];
    },
  },
  extraReducers(builder) {
    //Add transaction reducers
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactionList.push(action.payload.transaction);
      message.success(action.payload.message);
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      message.error(action.payload);
    });

    //Fetch transaction list reducers
    builder.addCase(fetchTransactionList.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchTransactionList.fulfilled, (state, action) => {
      state.transactionList = action.payload.transactions;
      state.status = "idle";
    });

    builder.addCase(fetchTransactionList.rejected, (state, action) => {
      state.status = "idle";
      state.transactionList = [];
      message.error(action.payload);
    });
  },
});

export const { clearTransactionList } = transactionListSlice.actions;

export default transactionListSlice.reducer;
