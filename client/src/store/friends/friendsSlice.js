import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

// Thunk to fetch friends
export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/friends/${userId}`); // API call to get friends
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to send friend request
export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async (friendEmail, { rejectWithValue }) => {
    try {
      const response = await api.post("/friends/friend-request", {
        email: friendEmail,
      }); // API call to send friend request
      return response.data; // Return response
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Thunk to accept friend request
export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/friends/friend-request/accept", data); // API call to accept friend request
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to search users by username or email
export const searchUsers = createAsyncThunk(
  "friends/searchUsers",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/friends/search`, { params: { query } }); // API call to search users
      return response.data.users; // Return the search results
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Thunk to fetch recommended users
export const fetchRecommendedUsers = createAsyncThunk(
  "friends/fetchRecommendedUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/friends/${userId}/recommended`); // API call to get recommended users
      return response.data.recommendedUsers; // Return recommended users
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Slice for managing friends state
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    friendRequests: [],
    searchResults: [], // To store user search results
    recommendedUsers: [], // To store recommended users
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch friends
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload; // Update friends list
      })

      // Send friend request
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload); // Add to friend requests
      })

      // Accept friend request
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.friends.push(action.payload); // Add to friends list
      })

      // Search users
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload; // Update search results
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload.message; // Handle search error
      })

      // Fetch recommended users
      .addCase(fetchRecommendedUsers.fulfilled, (state, action) => {
        state.recommendedUsers = action.payload; // Update recommended users list
      })
      .addCase(fetchRecommendedUsers.rejected, (state, action) => {
        state.error = action.payload.message; // Handle error
      })

      // Handle fetch friends rejection
      .addCase(fetchFriends.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export default friendsSlice.reducer;
