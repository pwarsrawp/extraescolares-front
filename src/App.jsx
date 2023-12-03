import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Login from './pages/LoginPage';
import Profile from './pages/Profile';
import Error from './pages/ErrorPage';
import Activities from './pages/Activities';
import ActivityDetails from './pages/ActivityDetails';
import Lists from './pages/Lists';
import ListDetails from './pages/ListDetails';
import { Box } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Box p={2} maxWidth={1368} sx={{ margin: '0 auto' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activities/:activityId' element={<ActivityDetails />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/lists/:listId' element={<ListDetails />} />
          <Route path='/lists/' element={<Lists />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
