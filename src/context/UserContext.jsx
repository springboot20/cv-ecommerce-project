/** @format */

import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { Axios } from '../api/Axios';
import jwt_decode from 'jwt-decode';

const UserContext = createContext({
  user: {},
  isLoggedIn: false,
});

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchMe() {
      try {
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const decodedToken = jwt_decode(token?.accessToken);
        const expirationTime = decodedToken?.exp;

        if (Date.now() >= expirationTime * 1000) {
          setIsLoggedIn(false);
          return;
        }

        const response = await Axios.get('/users/auth/me', {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        });
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    }
    fetchMe();
  }, [token?.accessToken, setUser, token]);

  return <UserContext.Provider value={{ user, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
