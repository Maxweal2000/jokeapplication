import React, { useState } from "react";
import { verifyAdmin } from "./admin"; // Assuming you have a verifyAdmin function

const SignIn = ({ onSignIn, onSwitchToSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Example of normal users
  const users = [
    { username: "user1", password: "password123" }, // Example normal user
    { username: "user2", password: "password456" },
    // Add more users here
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if it's the admin or a normal user
    if (verifyAdmin(username, password)) {
      onSignIn(username, true); // Sign in as admin
      return; // Stop further checks for normal users
    } else {
      // Check if the user exists in the normal users list
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        onSignIn(username, false); // Sign in as normal user
      } else {
        setError("Invalid username or password."); // Show error for incorrect credentials
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-white shadow-lg rounded-2xl p-6"
      >
        <input
          className="w-full p-2 mb-2 border rounded-lg"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border rounded-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4">
        <span>Don't have an account? </span>
        <button
          className="text-blue-500 hover:underline"
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
