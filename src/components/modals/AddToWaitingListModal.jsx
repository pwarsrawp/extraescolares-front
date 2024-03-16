import { FormControl, InputLabel, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import { ButtonContained } from '../Templates';

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

const AddToWaitingListModal = ({ modalState, handleModal, handleAddToWaitingList, students, waitingList, selectedStudent, setSelectedStudent }) => {
  return (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={2}>
        <Typography variant='subtitle1'>Seleccione uno de los alumnos de la lista:</Typography>
        <FormControl fullWidth sx={{ paddingBottom: 1 }}>
          <InputLabel id='select-student'>Seleccione alumno</InputLabel>
          <Select labelId='select-student' label='Seleccione Alumno' value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            {students
              ?.filter((s) => waitingList.every((wl) => wl.studentId !== s._id))
              .map((student, index) => (
                <MenuItem key={index} value={student}>
                  {student.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <ButtonContained onClick={handleAddToWaitingList}>Añadir alumno</ButtonContained>
      </Stack>
    </Modal>
  );
};

export default AddToWaitingListModal;
