// admin.js

export const adminCredentials = {
  username: "admin", // Correct admin username
  password: "12345", // Correct admin password
};

// Function to verify admin credentials
export const verifyAdmin = (username, password) => {
  return (
    username === adminCredentials.username &&
    password === adminCredentials.password
  );
};
