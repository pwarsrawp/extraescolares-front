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
import { updateOne } from '../../functions/api.calls';
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

const EditStudentModal = ({
  editModal,
  setEditModal,
  fetchStudents,
  student,
}) => {
  const [studentName, setStudentName] = useState(student?.name);
  const [studentLevel, setStudentLevel] = useState(student?.level);
  const { userAuthentication } = useContext(AuthContext);

  const closeEditModal = () => setEditModal(false);
  const handleNameInput = (e) => setStudentName(e.target.value);
  const handleLevelInput = (e) => setStudentLevel(e.target.value);

  const updateStudent = async () => {
    const body = {
      name: studentName,
      level: studentLevel,
    };
    try {
      const response = await updateOne(
        `${api_url}/students/${student._id}`,
        body
      );
      setStudentLevel(undefined);
      setStudentName(undefined);
      closeEditModal();
      userAuthentication();
      fetchStudents();
      return response;
    } catch (error) {
      console.log('An error ocurred modifying student', error);
    }
  };

  return (
    <Modal open={editModal} onClose={closeEditModal}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Modificar alumno
        </Typography>
        <TextField
          id='studentName'
          required
          label='Nombre completo'
          defaultValue={student.name}
          value={studentName}
          onChange={handleNameInput}
        />
        <Select
          value={studentLevel}
          defaultValue={student.level}
          label='Curso'
          onChange={handleLevelInput}
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
        <Button onClick={updateStudent}>Guardar</Button>
      </Stack>
    </Modal>
  );
};

export default EditStudentModal;
