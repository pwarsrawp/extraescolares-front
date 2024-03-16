import { Modal, Stack, Typography } from '@mui/material';
import { ButtonContained, ButtonOutlined } from '../Templates';

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

const DeleteActivityModal = ({ modalState, handleModal, selectedActivity, onDeleteActivity }) => {
    console.log(selectedActivity)
  return (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600}>
          Está seguro/a de que desea eliminar la actividad {selectedActivity?.name}?
        </Typography>
        <ButtonOutlined onClick={() => handleModal(false)}>Cancelar</ButtonOutlined>
        <ButtonContained color='error' onClick={onDeleteActivity}>Eliminar</ButtonContained>
      </Stack>
    </Modal>
  );
};

export default DeleteActivityModal;
