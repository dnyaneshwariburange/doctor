import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const isAdminString = localStorage.getItem('isAdmin');
    const isAdminValue = isAdminString === 'true'; // Convert to boolean
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(isAdminValue);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const login = (token, adminStatus) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('isAdmin', adminStatus);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus === 'true');
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
