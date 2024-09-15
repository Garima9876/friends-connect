import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch friends
export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (userId) => {
    const response = await axios.get(`/api/friends/${userId}`);
    return response.data;
  }
);

// Thunk to send friend request
export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async (data) => {
    const response = await axios.post("/api/friends/friend-request", data);
    return response.data;
  }
);

// Thunk to accept friend request
export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  async (data) => {
    const response = await axios.post(
      "/api/friends/friend-request/accept",
      data
    );
    return response.data;
  }
);

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
        state.friends = action.payload.friends;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        // handle success
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        // handle success
      });
  },
});

export default friendsSlice.reducer;
