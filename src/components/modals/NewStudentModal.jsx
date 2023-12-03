import {
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { postOne, updateOne } from '../../functions/api.calls';

import { AuthContext } from '../../context/auth.context';

const api_url = import.meta.env.VITE_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#FFFFFF',
  boxShadow: 24,
  padding: '2rem',
};

const NewStudentModal = ({
  newModal,
  setNewModal,
  user,
  updates,
  fetchUserData,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentLevel, setStudentLevel] = useState('');

  const closeNewModal = () => setNewModal(false);

  const createStudent = async () => {
    const newStudent = {
      name: studentName,
      level: studentLevel,
    };
    const body = { $push: { students: newStudent } };
    try {
      const response = await updateOne(`${api_url}/users/${user._id}`, body);
      closeNewModal();
      fetchUserData();
      return response;
    } catch (error) {
      console.log('An error ocurred creating student', error);
    }
  };

  return (
    <Modal open={newModal} onClose={closeNewModal}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Nuevo alumno
        </Typography>
        <TextField
          id='studentName'
          required
          label='Nombre completo'
          value={studentName}
          onChange={(e) => {
            setStudentName(e.target.value);
          }}
        />
        <Select
          value={studentLevel}
          label='Edad'
          onChange={(e) => setStudentLevel(e.target.value)}
        >
          <MenuItem value='3 años'>3 años</MenuItem>
          <MenuItem value='4 años'>4 años</MenuItem>
          <MenuItem value='5 años'>5 años</MenuItem>
          <MenuItem value='1º primaria'>1º primaria</MenuItem>
          <MenuItem value='2º primaria'>2º primaria</MenuItem>
          <MenuItem value='3º primaria'>3º primaria</MenuItem>
          <MenuItem value='4º primaria'>4º primaria</MenuItem>
          <MenuItem value='5º primaria'>5º primaria</MenuItem>
          <MenuItem value='6º primaria'>6º primaria</MenuItem>
        </Select>
        <Button onClick={createStudent}>Guardar</Button>
      </Stack>
    </Modal>
  );
};

export default NewStudentModal;
