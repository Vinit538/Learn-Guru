import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  isSignup: false,
  toggleSignup: () => {},
});

const UserProvider = ({ children }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleSignup = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <UserContext.Provider value={{ isSignup, toggleSignup }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
