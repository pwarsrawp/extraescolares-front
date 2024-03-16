import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '@mui/material';

function LogoutButton() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return null;
  }

  return <Button onClick={logout}>Logout</Button>;
}

export default LogoutButton;
