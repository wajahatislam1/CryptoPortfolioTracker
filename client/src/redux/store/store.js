import { configureStore } from "@reduxjs/toolkit";

import userSliceReducer from "../slices/user.slice";
import portfolioListSliceReducer from "../slices/portfolioList.slice";
import coinListSliceReducer from "../slices/coinList.slice";
import transactionListSliceReducer from "../slices/transactionList.slice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    portfolioList: portfolioListSliceReducer,
    coinList: coinListSliceReducer,
    transactionList: transactionListSliceReducer,
  },
});

export default store;
