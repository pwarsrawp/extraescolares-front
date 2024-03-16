import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = 'lists';

const getLists = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}`);
    return data;
  } catch (error) {
    console.log('Could not fetch activities: ', error);
  }
};

const getListByActivityId = async (activityId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}/activity/${activityId}`);
    return data;
  } catch (error) {
    console.log('Could not fetch some data: ', error);
  }
};

const updateList = async (body) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}`, body);
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

const createList = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/${ENDPOINT}`, body);
    return response;
  } catch (error) {
    console.log('Could not create new entry: ', error);
    throw error;
  }
};

const deleteList = async (listId) => {
  try {
    await axios.delete(`${API_URL}/${ENDPOINT}`, listId);
  } catch (error) {
    console.log('Could not fetch specific data: ', error);
  }
};

export { getLists, getListByActivityId, updateList, createList, deleteList };
