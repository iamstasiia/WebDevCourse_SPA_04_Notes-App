import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsAuthenticated(true);
      setUserId(localStorage.getItem('userId'));
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId, setUserId, username, setUsername}}>
      {children}
    </AuthContext.Provider>
  );
};
