import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          Friends Connect
        </Link>
        <button
          className="navbar-toggler"
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
      </div>
    </nav>
  );
};

export default Navbar;
