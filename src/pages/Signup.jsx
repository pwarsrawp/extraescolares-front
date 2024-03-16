import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { GridContainer, GridItem } from '../components/Templates';
import { signup } from '../functions/authentication';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [password, setPassword] = useState('');

  
// ACTIONS //
  const handleSignup = async () => {
    try {
      await signup({ email, name, surname, memberNumber, password });
      navigate('/acceso');
    } catch (error) {
      console.log('Issue with the sign up: ', error);
    }
  };
// RENDER //
  return (
    <GridContainer spacing={2} xs={12} sm={8} md={6}>
      <GridItem xs={12}>
        <Typography variant='h3'>Registro</Typography>
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Nombre familiar al cargo'
          variant='outlined'
          fullWidth
          value={name}
          required
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Apellidos familiar a cargo'
          variant='outlined'
          fullWidth
          value={surname}
          required
          onChange={(event) => {
            setSurname(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Nº de socio (si procede)'
          variant='outlined'
          fullWidth
          value={memberNumber}
          onChange={(event) => {
            setMemberNumber(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Contraseña'
          variant='outlined'
          type='password'
          fullWidth
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <Button type='submit' variant='contained' onClick={() => handleSignup()}>
          Enviar
        </Button>
      </GridItem>
      <GridItem xs={12}>
        <Typography>Ya está registrado/a?</Typography>
        <Link to={'/acceso'}>
          <Typography>Acceso</Typography>
        </Link>
      </GridItem>
    </GridContainer>
  );
}

export default Signup;
