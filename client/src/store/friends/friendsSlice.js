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

// Slice for managing friends state
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    friendRequests: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload; // Update friends list
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload); // Add to friend requests
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.friends.push(action.payload); // Add to friends list after accepting request
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export default friendsSlice.reducer;
