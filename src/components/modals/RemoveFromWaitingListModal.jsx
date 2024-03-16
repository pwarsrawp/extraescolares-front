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

const RemoveFromWaitingListModal = ({ modalState, handleModal, selectedStudent, handleRemoveFromWaitingList }) => {
  return (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={2}>
        <Typography variant='body1' fontWeight={600}>
          Está seguro/a de que desea eliminar el estudiante {selectedStudent?.name} de la lista? Esta acción no es reversible, el alumno perderá la posición.
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2}>
          <Button variant='outlined' onClick={() => handleModal(false)}>Cancelar</Button>
          <Button variant='outlined' onClick={handleRemoveFromWaitingList}>Eliminar</Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default RemoveFromWaitingListModal;
