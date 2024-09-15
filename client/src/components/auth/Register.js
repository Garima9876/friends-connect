import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../store/auth/authSlice";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ userData: { userName, email, password }, navigate }));
  };

  return (
    <div className="container-fluid vh-100 align-items-center bg-dark">
      <div className="row vh-100 justify-content-center p-5">
        <div className="card cols-md-6 d-flex flex-column justify-content-center align-items-center bg-white w-50 m-5">
          <h2 className="text-center mb-5 fw-bold">Register</h2>
          <form onSubmit={handleRegister} className="w-75">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
            <p className="mt-4">
              Already have an account?
              <Link
                className="font-medium ml-2 text-primary hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
