import { Navigate, Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

function AuthPrivate() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <Typography variant='h5'>Cargando datos...</Typography>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/acceso' replace={true} />;
}

export default AuthPrivate;
