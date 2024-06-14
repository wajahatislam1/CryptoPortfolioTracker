import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as portfolioAPI from "../../api/portfolios/portfolios.api";

import { message } from "antd";

export const addPortfolio = createAsyncThunk(
  "portfoliolist/addportfolio",
  async (portfolio, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;
      const response = await portfolioAPI.addPortfolio(portfolio, jwtToken);
      if (response.ok) {
        return await response.json();
      }
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const editPortfolio = createAsyncThunk(
  "portfoliolist/editportfolio",
  async (portfolioInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;

      const response = await portfolioAPI.editPortfolio(
        portfolioInfo.portfolioId,
        portfolioInfo.updatedPortfolio,
        jwtToken
      );

      if (response.ok) {
        return response.json();
      }
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfoliolist/deleteportfolio",
  async (portfolioId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;
      const response = await portfolioAPI.deletePortfolio(portfolioId, jwtToken);
      if (response.ok) {
        return { portfolioId, message: "Portfolio deleted successfully" };
      }
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const fetchPortfolioList = createAsyncThunk(
  "portfoliolist/fetchPortfoliolist",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;
      const response = await portfolioAPI.fetchPortfolioList(jwtToken);

      if (response.ok) {
        return response.json();
      }

      error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const addCoinToPortfolio = createAsyncThunk(
  "portfoliolist/addcointoportfolio",
  async (coinInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;
      const response = await portfolioAPI.addCoinToPortfolio(
        coinInfo.coin,
        coinInfo.portfolioId,
        jwtToken
      );
      if (response.ok) {
        return await response.json();
      }
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const deleteCoinFromPortfolio = createAsyncThunk(
  "portfoliolist/deletecoinfromportfolio",
  async (coinInfo, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;
      const response = await portfolioAPI.deleteCoinFromPortfolio(
        coinInfo.portfolioId,
        coinInfo.coinId,
        jwtToken
      );
      if (response.ok) {
        return await response.json();
      }
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(String(error));
    }
  }
);

export const getPortfolioCoinsStats = createAsyncThunk(
  "portfoliolist/getportfoliocoinsstats",
  async (portfolioId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const jwtToken = state.user.jwtToken;

      const response = await portfolioAPI.getPortfolioCoinsStats(portfolioId, jwtToken);
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const PortfolioListSlice = createSlice({
  name: "portfolioList",
  initialState: {
    portfolioList: [],
    error: null,
    fetched: false,
  },
  reducers: {
    setPortfolioList(state, action) {
      state.portfolioList = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(addPortfolio.fulfilled, (state, action) => {
      state.portfolioList = state.portfolioList.concat(action.payload.portfolio);
      state.error = null;
      message.success("Portfolio Added successfully");
    });

    builder.addCase(addPortfolio.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    //Edit Portfolio cases
    builder.addCase(editPortfolio.fulfilled, (state, action) => {
      const index = state.portfolioList.findIndex(
        (portfolio) => portfolio._id === action.payload.portfolio._id
      );

      state.portfolioList[index] = action.payload.portfolio;
      state.error = null;
      message.success(action.payload.message);
    });

    builder.addCase(editPortfolio.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    //Delete Portfolio cases
    builder.addCase(deletePortfolio.fulfilled, (state, action) => {
      state.portfolioList = state.portfolioList.filter(
        (portfolio) => portfolio._id !== action.payload.portfolioId
      );
      state.error = null;
      message.success(action.payload.message);
    });

    builder.addCase(deletePortfolio.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    //Fetch Portfolio cases
    builder.addCase(fetchPortfolioList.fulfilled, (state, action) => {
      state.portfolioList = action.payload.portfolios;
      state.error = null;
      state.pending = false;
      state.fetched = true;
    });

    builder.addCase(fetchPortfolioList.pending, (state, action) => {
      state.pending = true;
    });

    builder.addCase(fetchPortfolioList.rejected, (state, action) => {
      state.error = action.payload;
      state.pending = false;
      message.error(action.payload);
    });

    //Add coin to Portfolio cases
    builder.addCase(addCoinToPortfolio.fulfilled, (state, action) => {
      const index = state.portfolioList.findIndex(
        (portfolio) => portfolio._id === action.payload.portfolio._id
      );

      state.portfolioList[index] = action.payload.portfolio;
      state.error = null;
      message.success(action.payload.message);
    });

    builder.addCase(addCoinToPortfolio.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    //Delete coin from Portfolio cases
    builder.addCase(deleteCoinFromPortfolio.fulfilled, (state, action) => {
      const index = state.portfolioList.findIndex(
        (portfolio) => portfolio._id === action.payload.portfolio._id
      );

      state.portfolioList[index] = action.payload.portfolio;
      state.error = null;
      message.success(action.payload.message);
    });

    builder.addCase(deleteCoinFromPortfolio.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    //Fetch portfolio Stats cases
    builder.addCase(getPortfolioCoinsStats.fulfilled, (state, action) => {
      const portfolio = state.portfolioList.find(
        (portfolio) => portfolio._id === action.payload.portfolioId
      );
      portfolio.coinsStats = action.payload.coinsStats;
      state.error = null;
    });

    builder.addCase(getPortfolioCoinsStats.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });
  },
});

export const { setPortfolioList } = PortfolioListSlice.actions;

export default PortfolioListSlice.reducer;
