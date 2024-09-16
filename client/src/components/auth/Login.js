import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ userData: { email, password }, navigate }));
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row vh-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-dark">
          <h1 className="text-center text-white display-4 fw-bold">
            Welcome to<br/>
            <span className="text-primary">Friends Connect</span>
          </h1>
          <p className="mt-5 lead text-white">
            Join the community and connect with your friends today.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h2 className="text-center mb-5 fw-bold">Login</h2>
            <form onSubmit={handleLogin}>
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
                Login
              </button>
              <p className="mt-4">
                Don't have an account?
                <Link
                  className="font-medium ml-2 text-primary hover:underline"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
