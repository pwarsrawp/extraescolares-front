import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { fetchOne } from '../functions/api.calls';
import { useNavigate } from 'react-router-dom';
const api_url = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userUpdate, setUserUpdate] = useState(false);

  const navigate = useNavigate();

  /* LOGOUT */
  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  /* AUTHENTICATION */
  const userAuthentication = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const { data } = await axios.get(`${api_url}/auth/verify`, {
          headers: { authorization: `Bearer ${token}` },
        });

        // authorization successful
        setUser(data.currentUser);
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    } else {
      // reset states
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  useEffect(() => {
    if (userUpdate) {
      const fetchUser = async () => {
        try {
          const response = await fetchOne(`${api_url}/users/${user._id}`);
          setUser(response);
          setUserUpdate(false);
        } catch (error) {
          console.log('error updating user: ', error);
        }
      };
      fetchUser();
    }
  }, [userUpdate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        userAuthentication,
        setUserUpdate,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextWrapper };
