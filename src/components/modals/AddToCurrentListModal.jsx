import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack } from '@mui/material';

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

const AddToCurrentListModal = ({ modalState, handleModal, handleAddToCurrentList, students, currentList, selectedStudent, setSelectedStudent }) => {
  
  return (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={2}>
      <FormControl fullWidth sx={{ paddingBottom: 1 }}>
          <InputLabel id='select-student'>Seleccione alumno</InputLabel>
          <Select labelId='select-student' label='Seleccione Alumno' value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            {students
              ?.filter((i) => !currentList.includes(i))
              .map((student, index) => (
                <MenuItem key={index} value={student}>
                  {student.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button color='primary' variant='contained' onClick={handleAddToCurrentList}>
          Añadir alumno a la lista actual
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddToCurrentListModal;
