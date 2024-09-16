import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        {/* Add more links here */}
      </ul>
    </nav>
  );
};

export default Navbar;
