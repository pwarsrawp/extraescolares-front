import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const signup = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, body);
    return response;
  } catch (error) {
    console.log('Could not create new entry: ', error);
    throw error;
  }
};

const login = async (body) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, body);
    try {
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      console.error('Error setting authToken in localStorage:', error);
    }
  } catch (error) {
    console.log('Could not create new entry: ', error);
    throw error;
  }
};

export { signup, login };
