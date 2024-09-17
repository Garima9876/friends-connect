import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosConfig";
import { toast } from "react-toastify";

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
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/friends/friend-request", {
        userId, // Send userId and friendId in the request
        friendId,
      });
      return response.data; // Return response data
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

// Thunk to decline friend request
export const declineFriendRequest = createAsyncThunk(
  "friends/declineFriendRequest",
  async ({ userId, friendId }) => {
    const response = await api.post("/friends/friend-request/decline", {
      userId,
      friendId,
    });
    return response.data;
  }
);

// Thunk to search users by username or email
export const searchUsers = createAsyncThunk(
  "friends/searchUsers",
  async ({ query, userId }, { rejectWithValue }) => {
    try {
      // API call to search users, passing query and userId
      const response = await api.get(`/friends/search`, {
        params: {
          query,
          userId, // Pass userId to API
        },
      });
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

// Remove Friend
export const removeFriend = createAsyncThunk(
  "friends/removeFriend",
  async ({ userId, friendId }) => {
    await api.post("/friends/remove", {
      userId,
      friendId,
    });
    return friendId; // return the removed friend's ID
  }
);

// Slice for managing friends state
const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    friendRequests: [],
    searchResults: [],
    recommendedUsers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload || { friends: [], success: false };
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload);
        toast.success("Friend request sent successfully!");
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        const friendData = action.payload;
        state.friends = {
          ...state.friends,
          friends: Array.isArray(state.friends.friends)
            ? [...state.friends.friends, friendData]
            : [friendData],
        };
        toast.success("Friend request accepted!");
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        toast.success(action.payload?.message || "Search results loaded successfully!");
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(action.payload?.message || "Failed to search users");
      })
      .addCase(fetchRecommendedUsers.fulfilled, (state, action) => {
        state.recommendedUsers = action.payload;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.friends = {
          ...state.friends,
          friends: state.friends.friends.filter(
            (friend) => friend._id !== action.payload
          ),
        };
        toast.success("Friend removed successfully!");
      })
      .addCase(declineFriendRequest.fulfilled, (state, action) => {
        toast.info("Friend request declined.");
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(action.payload?.message || "Failed to send friend request");
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(
          action.payload?.message || "Failed to accept friend request"
        );
      })
      .addCase(declineFriendRequest.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(
          action.payload?.message || "Failed to decline friend request"
        );
      })
      .addCase(fetchRecommendedUsers.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.error = action.payload?.message || "An unexpected error occurred";
        toast.error(action.payload?.message || "Failed to remove friend");
      });
  },
});

export default friendsSlice.reducer;
