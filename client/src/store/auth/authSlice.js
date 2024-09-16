import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosConfig"; // Import axios instance

// Thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData); // API call for registration
      navigate("/login"); // Navigate to the login page on successful registration
      return response.data; // Return user data and token
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error response
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", userData); // API call for login
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      navigate("/friends"); // Navigate to the friends page on successful login
      return response.data; // Return user data and token
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error response
    }
  }
);

// Slice for authentication state management
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token on logout
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
