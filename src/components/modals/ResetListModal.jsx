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

const ResetListModal = ({ modalState, handleModal, onResetList, resetListType }) => {
  return resetListType === 'current' ? (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={2}>
        <Typography variant='body1' fontWeight={600}>
          Está seguro/a de que quiere reiniciar la lista de alumnos/as actuales?
        </Typography>
        <Typography variant='body1' fontWeight={600}>
          Esta acción no es reversible, se borrará la lista por completo.
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2}>
          <ButtonOutlined onClick={() => handleModal(false)}>Cancelar</ButtonOutlined>
          <ButtonContained onClick={() => onResetList()}>Aceptar</ButtonContained>
        </Stack>
      </Stack>
    </Modal>
  ) : (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={2}>
        <Typography variant='body1' fontWeight={600}>
          Está seguro/a de que quiere reiniciar la lista de espera?
        </Typography>
        <Typography variant='body1' fontWeight={600}>
          Esta acción no es reversible, se borrará la lista por completo y los alumnos perderán sus posiciones.
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2}>
          <ButtonOutlined onClick={() => handleModal(false)}>Cancelar</ButtonOutlined>
          <ButtonContained onClick={() => onResetList()}>Aceptar</ButtonContained>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ResetListModal;
