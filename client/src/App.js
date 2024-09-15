import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FriendsList from "./components/friends/FriendsList";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
// import FriendRequests from "./components/friends/FriendRequests";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/friends"
          element={
            <PrivateRoute>
              <Navbar />
              <FriendsList />
              {/* <FriendRequests /> */}
            </PrivateRoute>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
