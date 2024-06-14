import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as coinApi from "../../api/coins/coins.api";

export const fetchCoinList = createAsyncThunk("coinList/fetchCoinList", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const jwtToken = state.user.jwtToken;
    const response = await coinApi.fetchCoinList(jwtToken);
    if (response.ok) {
      return await response.json();
    }
    const error = await response.json();
    return thunkAPI.rejectWithValue(error.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const coinListSlice = createSlice({
  name: "coinList",
  initialState: {
    coinList: [],
    pending: false,
  },

  extraReducers(builder) {
    builder.addCase(fetchCoinList.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(fetchCoinList.fulfilled, (state, action) => {
      state.coinList = action.payload.coins;
      state.pending = false;
    });
    builder.addCase(fetchCoinList.rejected, (state) => {
      state.pending = false;
    });
  },
});

export default coinListSlice.reducer;
