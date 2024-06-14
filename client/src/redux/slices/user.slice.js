import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "../../api/users/users.api";
import { message } from "antd";

// Create a thunk to sign in a user
export const userSignIn = createAsyncThunk("users/signIn", async (user, thunkAPI) => {
  try {
    const response = await userAPI.userSignIn(user);
    if (response.ok) {
      return await response.json();
    }
    const error = await response.json();
    return thunkAPI.rejectWithValue(error.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const userSignOut = createAsyncThunk("users/signOut", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const jwtToken = state.user.jwtToken;

    const response = await userAPI.userSignOut(jwtToken);
    if (response.ok) {
      return await response.json();
    }
    const error = await response.json();
    return thunkAPI.rejectWithValue(error.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(String(error));
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    jwtToken: localStorage.getItem("token") || null, // Load the token from localStorage
    error: null,
    message: null,
  },
  reducers: {
    setToken(state, action) {
      state.jwtToken = action.payload;
      localStorage.setItem("token", action.payload); // Store the token in localStorage
    },
  },

  extraReducers(builder) {
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.jwtToken = action.payload.token;
      localStorage.setItem("token", action.payload.token); // Store the token in localStorage
      state.error = null;
    });

    builder.addCase(userSignIn.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });

    // Add the signOut reducer
    builder.addCase(userSignOut.fulfilled, (state, action) => {
      state.jwtToken = null;
      localStorage.removeItem("token"); // Remove the token from localStorage
      state.error = null;
      message.success(action.payload.message);
    });
    builder.addCase(userSignOut.rejected, (state, action) => {
      state.error = action.payload;
      message.error(action.payload);
    });
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
