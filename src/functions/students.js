import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = 'students';

const getStudents = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}`);
    return data;
  } catch (error) {
    console.log('Could not fetch students: ', error);
  }
};

const getStudentsByUserId = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}/user/${userId}`);
    return data;
  } catch (error) {
    console.log('Could not fetch students: ', error);
  }
};

const getStudentById = async (studentId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${ENDPOINT}/${studentId}`);
    return data;
  } catch (error) {
    console.log('Could not fetch student: ', error);
  }
};

const updateStudent = async (body) => {
  try {
    await axios.put(`${API_URL}/${ENDPOINT}/${body.id}`, body);
  } catch (error) {
    console.log('Could not update specific student: ', error);
  }
};

const createStudent = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/${ENDPOINT}/create`, body);
    return response;
  } catch (error) {
    console.log('Could not create new student: ', error);
    throw error;
  }
};

const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${API_URL}/${ENDPOINT}/${studentId}`);
  } catch (error) {
    console.log('Could not delete specific student: ', error);
  }
};

export { getStudents, getStudentsByUserId, getStudentById, updateStudent, createStudent, deleteStudent };
