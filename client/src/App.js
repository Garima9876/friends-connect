import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FriendsList from "./components/friends/FriendsList";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { setUserFromStorage } from "./store/auth/authSlice";
import FriendRequests from "./components/friends/FriendRequests";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-friends"
          element={
            <PrivateRoute>
              <Navbar />
              <FriendsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/friend-requests"
          element={
            <PrivateRoute>
              <Navbar />
              <FriendRequests />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
