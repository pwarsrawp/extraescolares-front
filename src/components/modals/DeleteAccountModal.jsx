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

const DeleteAccountModal = ({ openModal, closeModal, handleDeleteAccount }) => {
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Stack style={style} spacing={1} p={4}>
        <Typography variant='subtitle2'>Está seguro/a de que desea eliminar su cuenta?</Typography>
        <Typography variant='subtitle2'>Se eliminaran tambien los estudiantes asociados y perderá el orden de lista. Esta acción no es reversible.</Typography>
        <Typography color='error' variant='subtitle2'>
          Esta acción no es reversible.
        </Typography>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleDeleteAccount}>Eliminar</Button>
      </Stack>
    </Modal>
  );
};

export default DeleteAccountModal;
