import { useState } from 'react';
import { Modal, Stack, TextField, Typography } from '@mui/material';
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

const NewActivityModal = ({ modalState, handleModal, onCreateActivity }) => {
  const [activityData, setActivityData] = useState({});
  const handleInput = (key, value) => setActivityData({ ...activityData, [key]: value });

  return (
    <Modal open={modalState} onClose={() => handleModal(false)}>
      <Stack style={style} spacing={1}>
        <Typography variant='body1' fontWeight={600} pb={2}>
          Nueva actividad
        </Typography>
        <TextField id='name' required label='Nombre' value={activityData?.name} onChange={(e) => handleInput('name', e.target.value)} />
        <TextField id='ciclo' required label='Ciclo' value={activityData?.cicle} onChange={(e) => handleInput('cicle', e.target.value)} />
        <TextField id='level' required label='Nivel' value={activityData?.level} onChange={(e) => handleInput('level', e.target.value)} />
        <TextField id='numberDays' required label='Nº días' value={activityData?.numberDays} onChange={(e) => handleInput('numberDays', e.target.value)} />
        <TextField id='daysWeek' required label='Dias' value={activityData?.daysWeek} onChange={(e) => handleInput('daysWeek', e.target.value)} />
        <TextField id='schedule' required label='Horario' value={activityData?.schedule} onChange={(e) => handleInput('schedule', e.target.value)} />
        <TextField id='memberPrice' required label='Precio socios' value={activityData?.memberPrice} onChange={(e) => handleInput('memberPrice', e.target.value)} />
        <TextField
          id='noMemberPrice'
          required
          label='Precio no socios'
          value={activityData?.noMemberPrice}
          onChange={(e) => handleInput('noMemberPrice', e.target.value)}
        />
        <TextField id='company' required label='Empresa' value={activityData?.company} onChange={(e) => handleInput('company', e.target.value)} />
        <TextField id='slots' required label='Nº plazas' value={activityData?.slots} onChange={(e) => handleInput('slots', e.target.value)} />
        <Stack direction='row' justifyContent='center' spacing={2} pt={2}>
          <ButtonOutlined onClick={() => handleModal(false)}>Cancelar</ButtonOutlined>
          <ButtonContained onClick={() => onCreateActivity(activityData)}>Guardar</ButtonContained>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default NewActivityModal;
