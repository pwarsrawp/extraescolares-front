import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = 'users';

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}`);
    return data;
  } catch (error) {
    console.log('Could not fetch students: ', error);
  }
};

const getUser = async (activityId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}/${activityId}`);
    return data;
  } catch (error) {
    console.log('Could not fetch some data: ', error);
  }
};

const updateUser = async (body) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${body.id}`, body);
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

const createUser = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/${ENDPOINT}/create`, body);
    return response;
  } catch (error) {
    console.log('Could not create new entry: ', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${ENDPOINT}/${userId}`);
  } catch (error) {
    console.log('Could not fetch specific data: ', error);
  }
};

export { getUsers, getUser, updateUser, createUser, deleteUser };
