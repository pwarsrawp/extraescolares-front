import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer.jsx';
import AuthContextProvider from '../contexts/AuthContext.jsx';
// import { Box, styled } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2.js';

// const AppContainer = styled(Box)({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'start',
//   maxWidth: '1200px',
//   minHeight: 'calc(100vh - 160px)',
//   margin: '0 auto',
//   marginTop: 20,
//   marginBottom: 20,
// });

const AppContainer = ({ children }) => {
  return (
    <Grid2 container maxWidth={1200} minHeight='calc(100vh - 160px)' margin='0 auto' justifyContent='center' alignItems='start' id='AppContainer'>
      {children}
    </Grid2>
  );
};

function Layout() {
  return (
    <AuthContextProvider>
      <Header />
      <AppContainer id='AppContainer'>
        <Outlet />
      </AppContainer>
      <Footer />
    </AuthContextProvider>
  );
}

export default Layout;
