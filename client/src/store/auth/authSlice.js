import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

// Thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for authentication state management
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserFromStorage: (state) => {
      // Load user and token from localStorage into state
      state.user = JSON.parse(localStorage.getItem("user")) || null;
      state.token = localStorage.getItem("token") || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
