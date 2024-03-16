import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = 'activities';

export const getActivities = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}`);
    return data;
  } catch (error) {
    console.log('Could not fetch activities: ', error);
  }
};

export const getActivity = async (activityId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}/${activityId}`);
    return data;
  } catch (error) {
    console.log('Could not fetch some data: ', error);
  }
};

export const updateActivity = async (activityId, body) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${activityId}`, body);
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

export const createActivity = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/${ENDPOINT}/create`, body);
    return response;
  } catch (error) {
    console.log('Could not create new entry: ', error);
    throw error;
  }
};

export const deleteActivity = async (activityId) => {
  try {
    await axios.delete(`${API_URL}/${ENDPOINT}/${activityId}`);
  } catch (error) {
    console.log('Could not fetch specific data: ', error);
  }
};

///////////////////////////////////////////
////////// WAITING LIST ACTIONS ///////////
///////////////////////////////////////////
export const addToWaitingList = async ({ activityId, studentId }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/add-waiting`, { studentId });
    return data;
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

export const removeFromWaitingList = async ({ activityId, studentId }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/remove-waiting`, { studentId });
    return data;
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

export const resetWaitingList = async (activityId) => {
  try {
    const { data } = await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/clear-waiting`);
    return data;
  } catch (error) {
    console.log('Could not reset waiting list: ', error);
  }
};

///////////////////////////////////////////
////////// CURRENT LIST ACTIONS ///////////
///////////////////////////////////////////
export const addToCurrentList = async ({ activityId, studentId }) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/add-current`, { studentId });
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

export const removeFromCurrentList = async ({ activityId, studentId }) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/remove-current`, { studentId });
  } catch (error) {
    console.log('Could not update specific entry: ', error);
  }
};

export const resetCurrentList = async (activityId) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${activityId}/clear-current`);
  } catch (error) {
    console.log('Could not reset waiting list: ', error);
  }
};
