import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Typography } from '@mui/material';

function AdminPrivate() {
  const { isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return <Typography variant='h5'>Cargando datos...</Typography>;
  }

  return isAdmin ? <Outlet /> : <Navigate to='/' />;
}

export default AdminPrivate;
