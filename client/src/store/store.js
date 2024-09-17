import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import friendsReducer from "./friends/friendsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
  },
});
