import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosConfig";
import { toast } from "react-toastify";

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

// Thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/user/${userId}`);
      return response.data.user;
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
      state.user = JSON.parse(localStorage.getItem("user")) || null;
      state.token = localStorage.getItem("token") || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success("Registration successful!");
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success("Login successful!");
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(
          action.payload?.message || "Failed to register. Please try again."
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(
          action.payload?.message ||
            "Failed to login. Please check your credentials."
        );
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(
          action.payload?.message ||
            "Failed to fetch user details. Please try again."
        );
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
