import { Button, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '95%',
  backgroundColor: '#FFFFFF',
  boxShadow: 24,
  padding: '4rem',
};

const EditStudentModal = ({ openModal, closeModal, selectedStudent, setSelectedStudent, handleEditStudent }) => {
  const handleInput = (key, value) => setSelectedStudent({ ...selectedStudent, [key]: value });

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Modificar alumno
        </Typography>
        <TextField id='studentName' required label='Nombre completo' defaultValue={selectedStudent?.name} value={selectedStudent?.name} onChange={(e) => handleInput('name', e.target.value)} />
        <Select value={selectedStudent?.level} defaultValue={selectedStudent?.level} label='Curso' onChange={(e) => handleInput('level', e.target.value)}>
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
        <Button onClick={handleEditStudent}>Guardar</Button>
      </Stack>
    </Modal>
  );
};

export default EditStudentModal;
