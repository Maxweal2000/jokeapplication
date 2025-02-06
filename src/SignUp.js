import { useState } from "react";

export default function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }
    onSignUp(username); // Call the parent function to handle sign up logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-80 bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 mb-4 border rounded-lg"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border rounded-lg"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
