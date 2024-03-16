import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { GridContainer, GridItem } from '../components/Templates';
import { login } from '../functions/authentication';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { userAuthentication } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ email: email, password: password });
      await userAuthentication();
      navigate('/perfil');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage('An error occurred while logging in.');
      }
    }
  };

  return (
    <GridContainer spacing={2} xs={12} sm={8} md={6}>
      <GridItem xs={12}>
        <Typography variant='h3'>Acceso</Typography>
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </GridItem>
      <GridItem xs={12}>
        <TextField
          label='Contraseña'
          variant='outlined'
          type='password'
          name='password'
          fullWidth
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </GridItem>
      {errorMessage ? (
        <GridItem xs={12}>
          <Typography color='error'>{errorMessage}</Typography>
        </GridItem>
      ) : (
        ''
      )}

      <GridItem xs={12}>
        <Button type='submit' variant='contained' onClick={() => handleLogin()}>
          Acceder
        </Button>
      </GridItem>
      <GridItem xs={12}>
        <Typography>Aún no esta registrado/a?</Typography>
        <Link to={'/registro'}>
          <Typography>Registro</Typography>
        </Link>
      </GridItem>
    </GridContainer>
  );
}

export default Login;
