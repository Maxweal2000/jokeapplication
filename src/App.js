import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp"; // The initial sign-up page
import { adminCredentials, verifyAdmin } from "./admin"; // Importing the admin credentials and verification function
import "./styles.css"; // Add your styles

const defaultAdminJokes = [
  {
    question: "Why don’t skeletons fight each other?",
    answer: "Because they don’t have the guts!",
    username: "admin",
  },
  {
    question: "Why did the scarecrow win an award?",
    answer: "Because he was outstanding in his field!",
    username: "admin",
  },
  {
    question: "Why couldn’t the bicycle stand up by itself?",
    answer: "It was two-tired!",
    username: "admin",
  },
  {
    question: "What do you call fake spaghetti?",
    answer: "An impasta!",
    username: "admin",
  },
];

const App = () => {
  const [user, setUser] = useState(null); // Logged-in user
  const [isAdmin, setIsAdmin] = useState(false); // To track if the logged-in user is an admin
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Sign-Up and Sign-In
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  }); // For sign-in credentials
  const [adminJokes, setAdminJokes] = useState(defaultAdminJokes); // Admin's jokes
  const [userJokes, setUserJokes] = useState([]); // User's jokes (created by the user)
  const [currentIndex, setCurrentIndex] = useState(0); // Current joke index
  const [showAnswer, setShowAnswer] = useState(false); // To toggle showing the answer
  const [newJoke, setNewJoke] = useState({ question: "", answer: "" }); // For creating new jokes
  const [isCreating, setIsCreating] = useState(false); // To track if the user is creating a new joke

  const handleSignUp = (username) => {
    setUser(username); // Set the logged-in user to the username
    setIsSignUp(false); // Switch to flashcard view
  };

  const handleSignIn = () => {
    // Check if the credentials match using verifyAdmin function
    if (verifyAdmin(userCredentials.username, userCredentials.password)) {
      setIsAdmin(true); // Set the user as admin
      setUser(userCredentials.username); // Set the logged-in user to the username
    } else {
      setIsAdmin(false); // Ensure non-admin users don't have admin rights
      setUser(userCredentials.username); // Set the logged-in user to a regular user
    }
    setIsSignUp(false); // Switch to flashcard view after sign-in
  };

  const handleSwitchToSignUp = () => {
    setIsSignUp(true); // Switch to the sign-up page
  };

  const handleSwitchToSignIn = () => {
    setIsSignUp(false); // Switch to the sign-in page
  };

  const handleSignOut = () => {
    setUser(null); // Reset user state to log out
    setIsAdmin(false); // Reset admin status
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % adminJokes.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCreateJoke = () => {
    setIsCreating(true);
  };

  const handleSubmitJoke = () => {
    if (newJoke.question && newJoke.answer) {
      const newJokeWithUser = { ...newJoke, username: user };
      setUserJokes([...userJokes, newJokeWithUser]);
      setNewJoke({ question: "", answer: "" });
      setIsCreating(false);
    }
  };

  const handleDeleteJoke = (index) => {
    const jokeToDelete = userJokes[index];

    if (jokeToDelete.username === user || isAdmin) {
      const updatedUserJokes = userJokes.filter(
        (_, jokeIndex) => jokeIndex !== index
      );
      setUserJokes(updatedUserJokes);
      if (index === currentIndex) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % updatedUserJokes.length
        );
      }
    } else {
      alert("You can only delete your own jokes!");
    }
  };

  const handleAdminDeleteJoke = (index) => {
    const updatedAdminJokes = adminJokes.filter(
      (_, jokeIndex) => jokeIndex !== index
    );
    setAdminJokes(updatedAdminJokes);
  };

  // Show either the SignUp, SignIn, or Flashcard view based on the current state
  if (user === null) {
    return isSignUp ? (
      <SignUp onSignUp={handleSignUp} onSwitchToSignIn={handleSwitchToSignIn} />
    ) : (
      <SignIn
        onSignIn={handleSignIn}
        userCredentials={userCredentials}
        setUserCredentials={setUserCredentials}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {isAdmin ? "Welcome Admin!" : `Welcome, ${user}!`}
      </h2>

      {/* Display joke from Admin or User */}
      {adminJokes.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < adminJokes.length ? (
        <div className="w-80 bg-white shadow-lg rounded-2xl p-6 text-center cursor-pointer">
          <h2 className="text-xl font-semibold text-gray-800">
            {showAnswer
              ? adminJokes[currentIndex].answer
              : adminJokes[currentIndex].question}
          </h2>
        </div>
      ) : (
        <div>No jokes available</div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={nextCard}
        >
          Next Joke
        </button>
        <button
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          onClick={toggleAnswer}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>

      {/* Create Your Own Joke */}
      {!isCreating ? (
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={handleCreateJoke}
        >
          Create Your Own Joke
        </button>
      ) : (
        <div className="mt-4 w-80 bg-white shadow-lg rounded-2xl p-6">
          <input
            className="w-full p-2 mb-2 border rounded-lg"
            type="text"
            placeholder="Enter question"
            value={newJoke.question}
            onChange={(e) =>
              setNewJoke({ ...newJoke, question: e.target.value })
            }
          />
          <input
            className="w-full p-2 mb-2 border rounded-lg"
            type="text"
            placeholder="Enter answer"
            value={newJoke.answer}
            onChange={(e) => setNewJoke({ ...newJoke, answer: e.target.value })}
          />
          <button
            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={handleSubmitJoke}
          >
            Submit Joke
          </button>
        </div>
      )}

      {/* Admin's Jokes */}
      <div className="mt-4 w-80 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Admin's Jokes</h3>
        <ul>
          {adminJokes.map((joke, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{joke.question}</span>
              {isAdmin && (
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleAdminDeleteJoke(index)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Your Jokes (User-created jokes) */}
      <div className="mt-4 w-80 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Your Jokes</h3>
        <ul>
          {userJokes.length > 0 ? (
            userJokes.map((joke, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span>{joke.question}</span>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteJoke(index)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500">
              You haven't created any jokes yet.
            </li>
          )}
        </ul>
      </div>

      {/* Sign Out Button */}
      <button
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default App;
