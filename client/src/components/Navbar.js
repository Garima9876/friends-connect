import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          Friends Connect
        </Link>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-bs-toggle="collapse" // Update this line to "data-bs-toggle"
          data-bs-target="#navbarNav" // Update this line to "data-bs-target"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-4">
            <li className="nav-item">
              <Link className="nav-link" to="/my-friends">
                My Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/friend-requests">
                Friend Requests
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-4">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
