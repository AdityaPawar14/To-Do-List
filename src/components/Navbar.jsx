import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between bg-indigo-900 text-white py-2 px-8">
      <div className="logo">
        <span className="font-bold text-xl">iTask</span>
      </div>

      <ul className="flex gap-6">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>

      {/* Auth Section */}
      <div>
        {isAuthenticated ? (
          <div className="flex gap-4">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded-md">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black px-2 py-1 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black px-2 py-1 rounded-md"
            />
            <button onClick={handleLogin} className="bg-green-600 px-4 py-1 rounded-md">
              Login
            </button>
          </div>
        )}
      </div>

      {/* Show error message if credentials are wrong */}
      {error && <p className="text-red-400 text-sm absolute top-14">{error}</p>}
    </nav>
  );
};

export default Navbar;
