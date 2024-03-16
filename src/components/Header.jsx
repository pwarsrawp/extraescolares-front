import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import useAuth from '../hooks/useAuth';

//////////////////////////////////////
////////// Styles ////////////////////
//////////////////////////////////////

const StyledButton = styled(Button)({
  color: 'white',
});
const NavigationLink = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

//////////////////////////////////////
////////// Component render //////////
//////////////////////////////////////\

function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <Grid2 container backgroundColor='#0ead99' height={80} id='Header' mb={4} xs={12}>
      <Grid2 container spacing={5} justifyContent='center' alignItems='center' width={1200} maxWidth='95%' sx={{ margin: '0 auto' }} xs={12}>
        <Grid2>
          <NavigationLink href='/actividades'>
            <Typography variant='body'>Actividades</Typography>
          </NavigationLink>
        </Grid2>
        {!isLoggedIn ? (
          <>
            <Grid2>
              <NavigationLink href='/registro'>
                <Typography variant='body'>Registro</Typography>
              </NavigationLink>
            </Grid2>
            <Grid2>
              <NavigationLink href='/acceso'>
                <Typography variant='body'>Acceso</Typography>
              </NavigationLink>
            </Grid2>
          </>
        ) : (
          <Grid2>
            <NavigationLink href='/perfil'>
              <Typography variant='body'>Mi cuenta</Typography>
            </NavigationLink>
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
}

export default Header;
