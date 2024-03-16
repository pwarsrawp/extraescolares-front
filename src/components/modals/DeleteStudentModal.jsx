import { Button, Modal, Stack, Typography } from '@mui/material';

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

const DeleteStudentModal = ({ openModal, closeModal, selectedStudent, handleDeleteStudent }) => {
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Está seguro/a de que desea eliminar el estudiante {selectedStudent?.name}?
        </Typography>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleDeleteStudent}>Eliminar</Button>
      </Stack>
    </Modal>
  );
};

export default DeleteStudentModal;
