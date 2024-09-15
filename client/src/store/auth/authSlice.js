import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for user registration
export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post("/api/auth/register", userData);
  return response.data;
});

// Thunk for user login
export const login = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post("/api/auth/login", userData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export default authSlice.reducer;
