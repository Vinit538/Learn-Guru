import React, { createContext, useContext, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();



export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //const navigate = useNavigate();


  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform your login logic and set the user data if login is successful
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
