import React, { createContext, useState } from 'react';

// Create the User Context
export const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  // State for the user
  const [user, setUser] = useState(null); // `null` when no user is logged in

  // Function to log in the user
  const logIn = (userData) => {
    setUser(userData); // Set user data after login
   // localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
   // localStorage.setItem('token', userData.token); // Save token to localStorage
  };

  // Function to log out the user
  const logOut = () => {
    setUser(null); // Clear user data
   // localStorage.removeItem('user'); // Remove user from localStorage
    //localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
