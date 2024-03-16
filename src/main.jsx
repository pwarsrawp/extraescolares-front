import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import AuthPrivate from './contexts/AuthPrivate.jsx';
import Layout from './components/Layout.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ActivityDetails from './pages/ActivityDetails.jsx';
import Activities from './pages/Activities.jsx';
import ListDetails from './pages/ListDetails.jsx';
import Lists from './pages/Lists.jsx';
import Profile from './pages/Profile.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ead99',
    },
    error: {
      main: '#e7214f',
    },
  },
  typography: {
    fontFamily: '"Lato", Helvetica, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'registro',
        element: <Signup />,
      },
      {
        path: 'acceso',
        element: <Login />,
      },
      {
        path: 'actividades/:activityId',
        element: <ActivityDetails />,
      },
      {
        path: 'actividades',
        element: <Activities />,
      },
      {
        path: 'listas/:listId',
        element: <ListDetails />,
      },
      {
        path: 'listas',
        element: <Lists />,
      },
      {
        path: 'perfil',
        element: <AuthPrivate />,
        children: [
          {
            path: '/perfil',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
